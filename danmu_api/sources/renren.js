import BaseSource from './base.js';
import { globals } from '../configs/globals.js';
import { log } from "../utils/log-util.js";
import { getPathname, httpGet, sortedQueryString, updateQueryString } from "../utils/http-util.js";
import { autoDecode, createHmacSha256, generateSign } from "../utils/codec-util.js";
import { generateValidStartDate } from "../utils/time-util.js";
import { addAnime, removeEarliestAnime } from "../utils/cache-util.js";
import { titleMatches } from "../utils/common-util.js";
import { SegmentListResponse } from '../models/dandan-model.js';

// =====================
// 获取人人视频弹幕
// =====================

/**
 * 人人视频弹幕源
 * 集成 TV 端 API 协议，保留网页版接口作为降级容灾策略。
 * 兼容处理 SeriesId-EpisodeId 复合主键，确保弹幕与剧集详情的关联正确性。
 */
export default class RenrenSource extends BaseSource {
  // API 配置常量
  API_CONFIG = {
    SECRET_KEY: "cf65GPholnICgyw1xbrpA79XVkizOdMq",
    
    // TV 端接口配置
    TV_HOST: "api.gorafie.com",
    TV_DANMU_HOST: "static-dm.qwdjapp.com",
    TV_VERSION: "1.2.2",
    TV_USER_AGENT: 'okhttp/3.12.13',
    TV_CLIENT_TYPE: 'android_qwtv_RRSP',
    TV_PKT: 'rrmj',

    // 网页版/旧版接口配置 (降级备用)
    WEB_HOST: "api.rrmj.plus",
    WEB_DANMU_HOST: "static-dm.rrmj.plus"
  };

  /**
   * 生成 TV 端接口所需的请求头
   * 处理签名、设备标识及版本控制字段
   * @param {number} timestamp 当前时间戳
   * @param {string} sign 接口签名
   * @returns {Object} HTTP Headers
   */
  generateTvHeaders(timestamp, sign) {
    return {
      'clientVersion': this.API_CONFIG.TV_VERSION,
      'p': 'Android',
      'deviceid': 'tWEtIN7JG2DTDkBBigvj6A%3D%3D',
      'token': '', // 必须为空字符串以通过校验
      'aliid': 'aYBd5dAzYrgDAOVWv2eYoPSo',
      'umid': '',  // 必须为空字符串以通过校验
      'clienttype': this.API_CONFIG.TV_CLIENT_TYPE,
      'pkt': this.API_CONFIG.TV_PKT,
      't': timestamp.toString(),
      'sign': sign,
      'isAgree': '1',
      'et': '2',
      'Accept-Encoding': 'gzip',
      'User-Agent': this.API_CONFIG.TV_USER_AGENT,
    };
  }

  /**
   * 搜索剧集 (TV API)
   * @param {string} keyword 搜索关键词
   * @param {number} size 分页大小
   * @returns {Array} 统一格式的搜索结果列表
   */
  async searchAppContent(keyword, size = 30) {
    try {
      const timestamp = Date.now();
      const path = "/qwtv/search";
      const queryParams = {
        searchWord: keyword,
        num: size,
        searchNext: "",
        well: "match"
      };

      const sign = generateSign(path, timestamp, queryParams, this.API_CONFIG.SECRET_KEY);
      const queryString = Object.entries(queryParams)
        .map(([k, v]) => `${k}=${encodeURIComponent(v === null || v === undefined ? "" : String(v))}`)
        .join('&');
      
      const headers = this.generateTvHeaders(timestamp, sign);

      const resp = await httpGet(`https://${this.API_CONFIG.TV_HOST}${path}?${queryString}`, {
        headers: headers,
        retries: 1,
      });

      if (!resp.data || resp.data.code !== "0000") return [];

      const list = resp.data.data || [];
      return list.map((item) => ({
        provider: "renren",
        mediaId: String(item.id),
        title: String(item.title || "").replace(/<[^>]+>/g, "").replace(/:/g, "："),
        type: "tv_series",
        season: null,
        year: item.year,
        imageUrl: item.cover,
        episodeCount: null, // 列表页不返回总集数
        currentEpisodeIndex: null,
      }));
    } catch (error) {
      log("error", "[Renren] searchAppContent error:", error.message);
      return [];
    }
  }

  /**
   * 获取剧集详情 (TV API)
   * @param {string} dramaId 剧集ID
   * @param {string} episodeSid 单集ID (可选)
   * @returns {Object} 详情数据对象
   */
  async getAppDramaDetail(dramaId, episodeSid = "") {
    try {
      const timestamp = Date.now();
      const path = "/qwtv/drama/details";
      const queryParams = {
        isAgeLimit: "false",
        seriesId: dramaId,
        episodeId: episodeSid,
        clarity: "HD",
        caption: "0",
        hevcOpen: "1"
      };

      const sign = generateSign(path, timestamp, queryParams, this.API_CONFIG.SECRET_KEY);
      const queryString = Object.entries(queryParams)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join('&');
      
      const headers = this.generateTvHeaders(timestamp, sign);

      const resp = await httpGet(`https://${this.API_CONFIG.TV_HOST}${path}?${queryString}`, {
        headers: headers,
        retries: 1,
      });

      if (!resp.data || resp.data.code !== "0000") return null;
      return resp.data;
    } catch (error) {
      log("error", "[Renren] getAppDramaDetail error:", error.message);
      return null;
    }
  }

  /**
   * 获取单集弹幕 (TV API)
   * 请求 static-dm.qwdjapp.com 获取全量弹幕数据
   * @param {string} episodeSid 单集ID (支持复合ID自动解包)
   * @returns {Array} 原始弹幕数据列表
   */
  async getAppDanmu(episodeSid) {
    try {
      const timestamp = Date.now();
      
      // 处理复合ID (SeriesId-EpisodeId)，提取真实的 EpisodeId
      let realEpisodeId = episodeSid;
      if (String(episodeSid).includes("-")) {
        realEpisodeId = String(episodeSid).split("-")[1];
      }

      // 构造请求路径 (注意：此处使用 EPISODE 路径，不包含 emo)
      const path = `/v1/produce/danmu/EPISODE/${realEpisodeId}`;
      const queryParams = {}; // 该接口无查询参数
      const sign = generateSign(path, timestamp, queryParams, this.API_CONFIG.SECRET_KEY);
      const headers = this.generateTvHeaders(timestamp, sign);

      // 请求旧域名 static-dm.qwdjapp.com
      const url = `https://${this.API_CONFIG.TV_DANMU_HOST}${path}`;

      const resp = await httpGet(url, {
        headers: headers,
        retries: 1,
      });

      if (!resp.data) return null;
      
      const data = autoDecode(resp.data);
      
      // 兼容直接返回数组或包装在 data 字段中的情况
      if (Array.isArray(data)) return data;
      if (data && data.data && Array.isArray(data.data)) return data.data;

      return [];
    } catch (error) {
      log("error", "[Renren] getAppDanmu error:", error.message);
      return null;
    }
  }

  /**
   * 执行网页版网络搜索 (降级逻辑)
   */
  async performNetworkSearch(keyword, { lockRef = null, lastRequestTimeRef = { value: 0 }, minInterval = 500 } = {}) {
    try {
      const url = `https://${this.API_CONFIG.WEB_HOST}/m-station/search/drama`;
      const params = { 
        keywords: keyword, 
        size: 20, 
        order: "match", 
        search_after: "", 
        isExecuteVipActivity: true 
      };

      if (lockRef) {
        while (lockRef.value) await new Promise(r => setTimeout(r, 50));
        lockRef.value = true;
      }

      const now = Date.now();
      const dt = now - lastRequestTimeRef.value;
      if (dt < minInterval) await new Promise(r => setTimeout(r, minInterval - dt));

      const resp = await this.renrenRequest("GET", url, params);
      lastRequestTimeRef.value = Date.now();

      if (lockRef) lockRef.value = false;

      if (!resp.data) return [];

      const decoded = autoDecode(resp.data);
      const list = decoded?.data?.searchDramaList || [];
      return list.map((item) => ({
        provider: "renren",
        mediaId: String(item.id),
        title: String(item.title || "").replace(/<[^>]+>/g, "").replace(/:/g, "："),
        type: "tv_series",
        season: null,
        year: item.year,
        imageUrl: item.cover,
        episodeCount: item.episodeTotal,
        currentEpisodeIndex: null,
      }));
    } catch (error) {
      log("error", "[Renren] performNetworkSearch error:", error.message);
      return [];
    }
  }

  // =====================
  // 标准接口实现 (BaseSource 抽象方法)
  // =====================

  async search(keyword) {
    const parsedKeyword = { title: keyword, season: null };
    const searchTitle = parsedKeyword.title;
    const searchSeason = parsedKeyword.season;

    let allResults = [];
    
    // 1. 优先使用 TV 接口
    allResults = await this.searchAppContent(searchTitle);
    
    // 2. 降级策略: 若 TV 接口无结果，尝试网页接口
    if (allResults.length === 0) {
      log("info", "[Renren] TV 搜索无结果，降级到网页接口");
      const lock = { value: false };
      const lastRequestTime = { value: 0 };
      allResults = await this.performNetworkSearch(searchTitle, { 
        lockRef: lock, 
        lastRequestTimeRef: lastRequestTime, 
        minInterval: 400 
      });
    }

    if (searchSeason == null) return allResults;

    return allResults.filter(r => r.season === searchSeason);
  }

  async getDetail(id) {
    // 1. 优先使用 TV 接口
    const resp = await this.getAppDramaDetail(String(id));
    if (resp && resp.data) {
      return resp.data;
    }
    
    // 2. 降级策略: 尝试网页接口
    log("info", "[Renren] TV 详情接口失败，降级到网页接口"); // [复原日志]
    const url = `https://${this.API_CONFIG.WEB_HOST}/m-station/drama/page`;
    const params = { hsdrOpen: 0, isAgeLimit: 0, dramaId: String(id), hevcOpen: 1 };
    const fallbackResp = await this.renrenRequest("GET", url, params);
    if (!fallbackResp.data) return null;
    const decoded = autoDecode(fallbackResp.data);
    return decoded?.data || null;
  }

  async getEpisodes(id) {
    const detail = await this.getDetail(id);
    if (!detail || !detail.episodeList) return [];

    let episodes = [];
    const seriesId = String(id); 

    detail.episodeList.forEach((ep, idx) => {
      const epSid = String(ep.sid || "").trim();
      if (!epSid) return;
      
      const showTitle = ep.title ? String(ep.title) : `第${String(ep.episodeNo || idx + 1).padStart(2, "0")}集`;
      
      // 构建复合ID (SeriesId-EpisodeId)
      // TV弹幕接口需要EpisodeId，搜索可能需要SeriesId，保留此结构确保上下文完整
      const compositeId = `${seriesId}-${epSid}`;

      episodes.push({ sid: compositeId, order: ep.episodeNo || idx + 1, title: showTitle });
    });

    return episodes.map(e => ({
      provider: "renren",
      episodeId: e.sid,
      title: e.title,
      episodeIndex: e.order,
      url: null
    }));
  }

  async handleAnimes(sourceAnimes, queryTitle, curAnimes) {
    const tmpAnimes = [];

    if (!sourceAnimes || !Array.isArray(sourceAnimes)) {
      log("error", "[Renren] sourceAnimes is not a valid array");
      return [];
    }

    await Promise.all(sourceAnimes
      .filter(s => titleMatches(s.title, queryTitle))
      .map(async (anime) => {
        try {
          const eps = await this.getEpisodes(anime.mediaId);
          let links = [];
          for (const ep of eps) {
            links.push({
              "name": ep.episodeIndex.toString(),
              "url": ep.episodeId,
              "title": `【${ep.provider}】 ${ep.title}`
            });
          }

          if (links.length > 0) {
            let transformedAnime = {
              animeId: Number(anime.mediaId),
              bangumiId: String(anime.mediaId),
              animeTitle: `${anime.title}(${anime.year})【${anime.type}】from renren`,
              type: anime.type,
              typeDescription: anime.type,
              imageUrl: anime.imageUrl,
              startDate: generateValidStartDate(anime.year),
              episodeCount: links.length,
              rating: 0,
              isFavorited: true,
              source: "renren",
            };

            tmpAnimes.push(transformedAnime);
            addAnime({ ...transformedAnime, links: links });

            if (globals.animes.length > globals.MAX_ANIMES) {
              removeEarliestAnime();
            }
          }
        } catch (error) {
          log("error", `[Renren] Error processing anime: ${error.message}`);
        }
      })
    );

    this.sortAndPushAnimesByYear(tmpAnimes, curAnimes);

    return tmpAnimes;
  }

  async getEpisodeDanmu(id) {
    // 1. 优先尝试 TV 接口
    let danmuList = await this.getAppDanmu(id);
    
    // 2. 降级策略: TV 接口无数据时，尝试网页版接口
    if (!danmuList || danmuList.length === 0) {
       log("info", "[Renren] TV 弹幕接口失败或无数据，尝试降级网页接口");
       danmuList = await this.getWebDanmuFallback(id);
    }
    
    // 3. 返回原始数据列表，BaseSource 会自动调用本类的 formatComments 进行格式化
    if (danmuList && Array.isArray(danmuList) && danmuList.length > 0) {
      log("info", `[Renren] 成功获取 ${danmuList.length} 条弹幕`);
      return danmuList;
    }

    return [];
  }

  /**
   * 获取网页版弹幕 (降级方法)
   * 自动处理复合 ID 的解包
   */
  async getWebDanmuFallback(id) {
    let realEpisodeId = id;
    if (String(id).includes("-")) {
      realEpisodeId = String(id).split("-")[1];
    }
    
    // 日志保留
    log("info", `[Renren] 降级网页版弹幕，使用 ID: ${realEpisodeId}`);

    const ClientProfile = {
      user_agent: "Mozilla/5.0",
      origin: "https://rrsp.com.cn",
      referer: "https://rrsp.com.cn/",
    };
    
    const url = `https://${this.API_CONFIG.WEB_DANMU_HOST}/v1/produce/danmu/EPISODE/${realEpisodeId}`;
    const headers = {
      "Accept": "application/json",
      "User-Agent": ClientProfile.user_agent,
      "Origin": ClientProfile.origin,
      "Referer": ClientProfile.referer,
    };
    
    try {
      const fallbackResp = await this.renrenHttpGet(url, { headers });
      if (!fallbackResp.data) return [];
      
      const data = autoDecode(fallbackResp.data);
      let list = [];
      if (Array.isArray(data)) list = data;
      else if (data?.data && Array.isArray(data.data)) list = data.data;
      
      return list;
    } catch (e) {
      log("error", `[Renren] 网页版弹幕降级失败: ${e.message}`);
      return [];
    }
  }

  async getEpisodeDanmuSegments(id) {
    return new SegmentListResponse({
      "type": "renren",
      "segmentList": [{
        "type": "renren",
        "segment_start": 0,
        "segment_end": 30000,
        "url": id
      }]
    });
  }

  async getEpisodeSegmentDanmu(segment) {
    return this.getEpisodeDanmu(segment.url);
  }

  // =====================
  // 数据解析与签名工具
  // =====================

  /**
   * 解析 RRSP 的 P 字段 (属性字符串)
   * 格式: timestamp,mode,size,color,uid,cid...
   * 使用安全数值转换，防止 NaN 污染导致数据被误去重
   */
  parseRRSPPFields(pField) {
    const parts = String(pField).split(",");
    
    // 安全数值转换工具：若解析结果为 NaN，则返回默认值
    const safeNum = (val, parser, defaultVal) => {
        if (val === undefined || val === null || val === "") return defaultVal;
        const res = parser(val);
        return isNaN(res) ? defaultVal : res;
    };
    
    const timestamp = safeNum(parts[0], parseFloat, 0); 
    const mode = safeNum(parts[1], x => parseInt(x, 10), 1);
    const size = safeNum(parts[2], x => parseInt(x, 10), 25);
    const color = safeNum(parts[3], x => parseInt(x, 10), 16777215); 
    
    const userId = parts[6] || "";
    const contentId = parts[7] || `${timestamp}:${userId}`;
    
    return { timestamp, mode, size, color, userId, contentId };
  }

  /**
   * 格式化弹幕列表为标准模型
   * 将原始 d/p 字段映射为系统内部对象
   * 兼容处理 item.d 和 item.content 内容字段
   */
  formatComments(comments) {
    return comments.map(item => {
      // 提取内容 (优先 d，兼容 content)
      let text = String(item.d || "");
      if (!text && item.content) text = String(item.content);
      
      if (!text) return null;

      // 提取属性 (p)
      if (item.p) {
        const meta = this.parseRRSPPFields(item.p);
        return {
          cid: Number(meta.contentId) || 0,
          p: `${meta.timestamp.toFixed(2)},${meta.mode},${meta.color},[renren]`,
          m: text,
          t: meta.timestamp
        };
      }
      return null;
    }).filter(Boolean);
  }

  /**
   * 生成网页版 API 签名
   */
  generateSignature(method, aliId, ct, cv, timestamp, path, sortedQuery, secret) {
    const signStr = `${method.toUpperCase()}\naliId:${aliId}\nct:${ct}\ncv:${cv}\nt:${timestamp}\n${path}?${sortedQuery}`;
    return createHmacSha256(secret, signStr);
  }

  /**
   * 构建网页版带签名的请求头
   */
  buildSignedHeaders({ method, url, params = {}, deviceId, token }) {
    const ClientProfile = {
      client_type: "web_pc",
      client_version: "1.0.0",
      user_agent: "Mozilla/5.0",
      origin: "https://rrsp.com.cn",
      referer: "https://rrsp.com.cn/",
    };
    const pathname = getPathname(url);
    const qs = sortedQueryString(params);
    const nowMs = Date.now();
    const SIGN_SECRET = "ES513W0B1CsdUrR13Qk5EgDAKPeeKZY";
    const xCaSign = this.generateSignature(
      method, deviceId, ClientProfile.client_type, ClientProfile.client_version,
      nowMs, pathname, qs, SIGN_SECRET
    );
    return {
      clientVersion: ClientProfile.client_version,
      deviceId,
      clientType: ClientProfile.client_type,
      t: String(nowMs),
      aliId: deviceId,
      umid: deviceId,
      token: token || "",
      cv: ClientProfile.client_version,
      ct: ClientProfile.client_type,
      uet: "9",
      "x-ca-sign": xCaSign,
      Accept: "application/json",
      "User-Agent": ClientProfile.user_agent,
      Origin: ClientProfile.origin,
      Referer: ClientProfile.referer,
    };
  }

  async renrenHttpGet(url, { params = {}, headers = {} } = {}) {
    const u = updateQueryString(url, params);
    const resp = await httpGet(u, {
      headers: headers,
      retries: 1,
    });
    return resp;
  }

  generateDeviceId() {
    return (Math.random().toString(36).slice(2)).toUpperCase();
  }

  async renrenRequest(method, url, params = {}) {
    const deviceId = this.generateDeviceId();
    const headers = this.buildSignedHeaders({ method, url, params, deviceId });
    const resp = await httpGet(url + "?" + sortedQueryString(params), {
      headers: headers,
      retries: 1,
    });
    return resp;
  }
}
