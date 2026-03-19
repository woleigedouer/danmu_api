// language=CSS
export const componentsCssContent = /* css */ `
/* 组件样式 - Zen-iOS Hybrid Design */

/* 导航按钮：胶囊式设计 */
.nav-buttons {
    display: flex;
    gap: 8px;
    background: rgba(118, 118, 128, 0.12);
    padding: 4px;
    border-radius: 14px; /* iOS Segmented Control style */
    flex-wrap: wrap;
}

.nav-btn {
    padding: 8px 16px;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    border-radius: 10px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    user-select: none;
}

.nav-btn:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.5);
}

.nav-btn.active {
    background: #FFFFFF;
    color: #000000;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12), 0 3px 1px rgba(0, 0, 0, 0.04);
}

.nav-btn:active {
    transform: scale(0.97);
}

/* 环境变量分类切换 */
.env-categories {
    display: flex;
    gap: 12px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.category-btn {
    padding: 10px 20px;
    background: #FFFFFF;
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 100px; /* Fully rounded */
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
    transition: all 0.2s;
    box-shadow: var(--shadow-card);
}

.category-btn:hover {
    transform: translateY(-1px);
    background: #FAFAFA;
}

.category-btn.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.category-btn:active {
    transform: scale(0.95);
}

/* 卡片列表 (Layering) */
.env-list {
    display: grid;
    gap: 16px;
    margin-bottom: 30px;
}

.env-item {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px);
    padding: 24px;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.8); /* Inner light stroke */
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px -1px rgba(0, 0, 0, 0.02),
        inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* Align to top for better look with descriptions */
    flex-wrap: wrap;
    gap: 20px;
    transition: transform 0.2s;
    overflow: hidden;
}

.env-item:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.8);
}

.env-item .env-info {
    flex: 1;
    min-width: 240px;
    overflow: hidden;
}

.env-item .env-info strong {
    color: var(--text-primary);
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 8px;
    display: block;
    letter-spacing: -0.01em;
    overflow-wrap: break-word;
    word-break: break-word;
}

.env-item .env-info div.text-dark-gray {
    background: rgba(0, 0, 0, 0.03);
    padding: 8px 12px;
    border-radius: 8px;
    font-family: 'SF Mono', 'Menlo', monospace;
    font-size: 14px;
    color: #333;
    display: block;
    border: 1px solid rgba(0,0,0,0.04);
    overflow-wrap: break-word;
    word-break: break-all;
}

.env-item .env-actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
}

/* 按钮体系 */
.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 12px; /* iOS medium radius */
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    letter-spacing: 0.01em;
}

.btn:active {
    transform: scale(0.95); /* Tactile feedback */
}

/* Primary: Dark Space Black */
.btn-primary {
    background: var(--primary-color);
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:hover {
    background: #333;
}

/* Success: iOS Green */
.btn-success {
    background: var(--success-color);
    color: white;
    box-shadow: 0 4px 12px rgba(52, 199, 89, 0.2);
}

.btn-success:hover {
    background: #2db54e;
}

/* Danger: iOS Red */
.btn-danger {
    background: var(--danger-color);
    color: white;
    box-shadow: 0 4px 12px rgba(255, 59, 48, 0.2);
}

.btn-danger:hover {
    background: #e03328;
}

/* 预览区域 */
.preview-area {
    display: grid;
    gap: 30px;
    margin-top: 20px;
}

.preview-category {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px);
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px -1px rgba(0, 0, 0, 0.02),
        inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    padding: 24px;
    transition: transform 0.2s;
    overflow: hidden;
}

.preview-category:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.75);
    box-shadow: var(--shadow-floating);
}

.preview-category h3 {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 20px;
    color: var(--text-primary);
    border-bottom: 1px solid rgba(0,0,0,0.05);
    padding-bottom: 12px;
}

.preview-item {
    padding: 16px;
    background: rgba(255, 255, 255, 0.5);
    margin-bottom: 12px;
    border-radius: 12px;
    border-left: 4px solid var(--primary-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    transition: all 0.2s;
    overflow: hidden;
}

.preview-item:last-child {
    margin-bottom: 0;
}

.preview-item:hover {
    transform: translateX(4px);
    background: #FFFFFF;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.preview-item .preview-key {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
    margin-bottom: 6px;
    font-weight: 700;
    overflow-wrap: break-word;
    word-break: break-word;
}

.preview-item .preview-value {
    background: transparent;
    padding: 0;
    font-family: 'SF Mono', 'Menlo', monospace;
    color: var(--text-primary);
    font-size: 13px;
    word-break: break-all;
    overflow-wrap: break-word;
}

/* 日志容器 */
.log-container, .api-response, .json-response, .error-response {
    background: #1C1C1E; /* Deep Dark */
    color: #F2F2F7;
    padding: 20px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);
    font-family: 'SF Mono', 'Menlo', monospace;
    font-size: 12px;
    line-height: 1.6;
    max-height: 400px;
    overflow: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.api-response.xml {
    color: #88ccff;
}

/* JSON高亮样式 */
.json-response .key {
    color: #9cdcfe;
}

.json-response .string {
    color: #ce9178;
}

.json-response .number {
    color: #b5cea8;
}

.json-response .boolean {
    color: #569cd6;
}

.json-response .null {
    color: #569cd6;
}

.json-response .undefined {
    color: #569cd6;
}

.error-response {
    color: #f48771;
}

.log-entry {
    padding: 4px 8px;
    border-radius: 4px;
    margin-bottom: 2px;
}
.log-entry:hover {
    background: rgba(255,255,255,0.05);
}

/* 模态框 */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 1000;
    padding: 20px;
    overflow-y: auto;
}

.modal.active {
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    border-radius: 32px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.5);
    padding: 40px;
    width: 100%;
    max-width: 600px;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    position: relative;
    top: 0;
    left: 0;
}

/* 配置编辑弹窗专用样式 - 更宽更协调的比例 */
#env-modal .modal-content {
    width: 90vw;
    max-width: 680px;
    max-height: 85vh;
    overflow-y: auto;
    padding: 32px 36px;
}

#env-modal .modal-content::-webkit-scrollbar {
    width: 6px;
}

#env-modal .modal-content::-webkit-scrollbar-track {
    background: transparent;
}

#env-modal .modal-content::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
}

#env-modal .modal-content::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
}

/* 多选标签区域优化 - 限制高度并支持滚动 */
#env-modal .selected-tags {
    max-height: 140px;
    overflow-y: auto;
}

#env-modal .available-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-height: 180px;
    overflow-y: auto;
    padding: 12px;
    background: rgba(245, 245, 247, 0.5);
    border-radius: 12px;
    margin-top: 12px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    padding-bottom: 20px;
    margin-bottom: 30px;
}

.modal-header h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
}

.close-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    font-size: 18px;
}

.close-btn:hover {
    background: rgba(0,0,0,0.1);
    transform: rotate(90deg);
}

/* 进度条 */
.progress-container {
    height: 2px;
    background: transparent;
}
.progress-bar {
    background: linear-gradient(90deg, var(--primary-color), var(--text-secondary));
    box-shadow: none;
}

/* Bilibili Status */
.bili-cookie-status {
    background: rgba(255,255,255,0.5);
    border: 1px solid rgba(0,0,0,0.05);
    border-left: 4px solid var(--primary-color);
    border-radius: 12px;
}

/* Tag Styles */
.value-type-badge {
    padding: 4px 10px;
    border-radius: 100px;
    background: var(--text-primary);
    color: #FFFFFF;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.05em;
}

/* 加载提示 */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9998;
}

.loading-overlay.active {
    display: flex;
}

.loading-content {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 32px;
    border-radius: 24px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    max-width: 320px;
    border: 1px solid rgba(255,255,255,0.4);
}

.loading-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(0,0,0,0.05);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s cubic-bezier(0.6, 0.2, 0.4, 0.8) infinite;
    margin: 0 auto 20px;
}

.loading-spinner-small {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 0.8s cubic-bezier(0.6, 0.2, 0.4, 0.8) infinite;
}

.btn-success .loading-spinner-small {
    border: 2px solid rgba(255,255,255,0.3);
    border-top: 2px solid white;
}

.loading-text {
    font-size: 16px;
    color: var(--text-primary);
    font-weight: 600;
    margin-bottom: 8px;
}

.loading-detail {
    font-size: 13px;
    color: var(--text-secondary);
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* 动漫搜索结果网格 */
.anime-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 20px;
    margin-top: 16px;
}

.anime-item {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.anime-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 0.85);
}

.anime-item:active {
    transform: scale(0.98);
}

.anime-item-img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    display: block;
    background: rgba(0, 0, 0, 0.03);
}

.anime-title {
    padding: 12px;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.4;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 剧集列表 */
.episode-list-container {
    display: grid;
    gap: 10px;
    margin-top: 16px;
}

.episode-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px);
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    transition: all 0.2s;
}

.episode-item:hover {
    background: rgba(255, 255, 255, 0.85);
    transform: translateX(4px);
}

.episode-item-content {
    flex: 1;
    font-size: 14px;
    color: var(--text-primary);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.episode-item-content strong {
    font-weight: 700;
    color: var(--text-primary);
}

.episode-push-btn {
    flex-shrink: 0;
    padding: 8px 16px;
    font-size: 13px;
}

/* 文字颜色工具类 */
.text-yellow-gold {
    color: #997a00;
}

/* 推送弹幕区域标题 */
#push-anime-list h3,
#push-episode-list h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--text-primary);
}

#push-anime-list,
#push-episode-list {
    margin-top: 24px;
    padding: 24px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.6);
}

/* 请求记录样式 */
.request-records-container {
    border-radius: 8px;
}

.no-records {
    text-align: center;
    color: #fff;
    padding: 60px;
    font-style: italic;
    font-size: 16px;
}

.record-item {
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    border: none;
    border-radius: 16px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    transition: transform 0.2s, box-shadow 0.2s;
}

.record-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.2);
}

.record-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
    gap: 15px;
}

.record-method {
    background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
    min-width: 60px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,180,219,0.3);
}

.record-interface {
    flex: 1;
    font-family: 'Courier New', monospace;
    font-weight: 600;
    color: #2d3748;
    word-break: break-all;
    font-size: 15px;
    background: #edf2f7;
    padding: 8px 16px;
    border-radius: 8px;
}

.record-ip {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 13px;
    min-width: 120px;
    text-align: center;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(245,87,108,0.3);
}

.record-timestamp {
    color: #718096;
    font-size: 14px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 2px dashed #e2e8f0;
    display: flex;
    align-items: center;
    gap: 8px;
}

.record-timestamp.no-params {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.record-timestamp::before {
    content: '🕐';
    font-size: 16px;
}

.record-params {
    background: #f5f5f5;
    border-radius: 12px;
    padding: 15px;
    border: 1px solid #e0e0e0;
}

.record-params-title {
    color: #667eea;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.record-params-title::before {
    content: '📋';
    font-size: 16px;
}

.record-params pre {
    margin: 0;
    padding: 15px;
    background: #ffffff;
    color: #333;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-x: auto;
    line-height: 1.6;
    border: 1px solid #ddd;
}

/* 请求记录移动端适配 */
@media (max-width: 768px) {
    .record-header {
        flex-direction: column;
        align-items: stretch;
    }

    .record-method,
    .record-interface,
    .record-ip {
        width: 100%;
        box-sizing: border-box;
    }
}

/* ===================== */
/* 弹幕测试相关样式      */
/* ===================== */

/* 顶级标签页 */
.api-top-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 20px;
    border-bottom: 2px solid #e0e0e0;
}

.api-top-tab {
    padding: 10px 24px;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    color: #666;
    transition: all 0.3s;
    margin-bottom: -2px;
}

.api-top-tab:hover {
    color: #667eea;
}

.api-top-tab.active {
    color: #667eea;
    border-bottom-color: #667eea;
    font-weight: bold;
}

.api-tab-content {
    display: none;
}

.api-tab-content.active {
    display: block;
}

/* 弹幕测试子标签 */
.danmu-test-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.danmu-test-tab {
    padding: 8px 20px;
    background: #f0f0f0;
    border: 2px solid transparent;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s;
    color: #555;
}

.danmu-test-tab:hover {
    background: #e0e0e0;
}

.danmu-test-tab.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.danmu-test-panel {
    display: none;
}

.danmu-test-panel.active {
    display: block;
}

/* 弹幕统计卡片 */
.danmu-stats {
    margin-bottom: 15px;
}

.danmu-stats-title {
    font-size: 16px;
    font-weight: bold;
    color: #667eea;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
}

.danmu-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
}

.danmu-stat-card {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    border: 1px solid #eee;
    transition: transform 0.2s;
}

.danmu-stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.stat-value {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
    word-break: break-all;
}

.stat-label {
    font-size: 12px;
    color: #999;
}

/* 弹幕热力图 */
.danmu-heatmap-container {
    margin-bottom: 15px;
    background: #f8f9fa;
    border-radius: 10px;
    padding: 15px;
}

.danmu-heatmap-container h3 {
    margin: 0 0 10px;
    font-size: 15px;
}

.heatmap-bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 100px;
    padding: 0 2px;
}

.heatmap-bar {
    flex: 1;
    min-width: 3px;
    border-radius: 2px 2px 0 0;
    transition: opacity 0.2s;
    cursor: pointer;
}

.heatmap-bar:hover {
    opacity: 0.8;
}

.heatmap-axis {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    font-size: 11px;
    color: #999;
}

/* 弹幕过滤标签 */
.danmu-filter-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
}

.danmu-filter-tab {
    padding: 6px 16px;
    background: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 15px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s;
    color: #555;
}

.danmu-filter-tab:hover {
    background: #e0e0e0;
}

.danmu-filter-tab.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

/* 弹幕列表 */
.danmu-list-area {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 15px;
}

.danmu-list-area h3 {
    margin: 0 0 10px;
    font-size: 15px;
}

.danmu-list {
    max-height: 500px;
    overflow-y: auto;
    border: 1px solid #eee;
    border-radius: 8px;
    background: white;
}

.danmu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 13px;
    transition: background 0.15s;
}

.danmu-item:last-child {
    border-bottom: none;
}

.danmu-item:hover {
    background: #f8f9ff;
}

.danmu-time {
    color: #999;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    min-width: 50px;
    flex-shrink: 0;
}

.danmu-color-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1px solid rgba(0,0,0,0.1);
}

.danmu-mode-tag {
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 8px;
    flex-shrink: 0;
    font-weight: 500;
}

.danmu-mode-scroll {
    background: #e3f2fd;
    color: #1976d2;
}

.danmu-mode-top {
    background: #fce4ec;
    color: #c62828;
}

.danmu-mode-bottom {
    background: #e8f5e9;
    color: #2e7d32;
}

.danmu-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
}

.danmu-load-more {
    margin-top: 10px;
}

/* 返回按钮 */
.btn-back {
    padding: 8px 16px;
    background: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    color: #555;
    transition: all 0.2s;
    margin-bottom: 15px;
    display: inline-block;
}

.btn-back:hover {
    background: #e0e0e0;
    color: #333;
}

/* 弹幕加载动画 */
.danmu-loading {
    text-align: center;
    padding: 60px 20px;
}

.danmu-loading .loading-spinner {
    margin: 0 auto 15px;
}

.danmu-loading .loading-text {
    color: #666;
    font-size: 15px;
}

/* 弹幕结果工具栏（返回+导出同行） */
.danmu-result-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
    gap: 10px;
}

.danmu-result-toolbar .btn-back {
    margin-bottom: 0;
}

.danmu-export-btns {
    display: flex;
    gap: 8px;
    margin-left: auto;
}

/* 弹幕测试移动端适配 */
@media (max-width: 768px) {
    .danmu-stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .api-top-tab {
        padding: 8px 16px;
        font-size: 14px;
    }

    .danmu-test-tabs {
        flex-wrap: wrap;
    }

    .stat-value {
        font-size: 16px;
    }

    .heatmap-bars {
        height: 70px;
    }
}

/* 偏移规则快速配置 */
.offset-rule-panel {
    display: none;
    margin-top: 10px;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #f9f9f9;
}

.offset-form-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.offset-label {
    font-size: 12px;
    color: #666;
}

.offset-input {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 13px;
    box-sizing: border-box;
}

.offset-sources {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 5px;
}

.offset-source-tag {
    padding: 3px 10px;
    border: 1px solid #ddd;
    border-radius: 12px;
    font-size: 12px;
    cursor: pointer;
    user-select: none;
    background: #fff;
    color: #666;
    transition: all 0.15s;
}

.offset-source-tag.selected {
    background: #1a73e8;
    color: #fff;
    border-color: #1a73e8;
}

.offset-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
}
`;

