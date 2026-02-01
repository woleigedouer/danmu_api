// language=JavaScript
export const previewJsContent = /* javascript */ `
// 渲染配置预览
let currentPreviewCategory = 'api';

function renderPreview() {
    const preview = document.getElementById('preview-area');
    const proxyConfigContainer = document.getElementById('proxy-config-container');
    
    // 从API获取真实配置数据
    fetch(buildApiUrl('/api/config'))
        .then(response => {
             const contentType = response.headers.get("content-type");
             if (contentType && contentType.indexOf("application/json") === -1) {
                  // 返回文本以便后续处理（例如显示HTML错误的前几个字符）
                  return response.text().then(text => {
                      throw new Error('Expected JSON, got ' + contentType + '. Content: ' + text.substring(0, 50) + '...');
                  });
             }
             if (!response.ok) {
                throw new Error('HTTP error! status: ' + response.status);
             }
             return response.json();
        })
        .then(config => {
            // 成功加载，隐藏反代配置框
            if(proxyConfigContainer) {
                proxyConfigContainer.style.display = 'none';
            }

            // 使用从API获取的分类环境变量
            const categorizedVars = config.categorizedEnvVars || {};
            
            // 渲染当前选中的预览内容
            let html = '';
            
            const items = categorizedVars[currentPreviewCategory];
            if (items && items.length > 0) {
                html += '<div class="preview-category">' +
                    '<h3>' + getCategoryName(currentPreviewCategory) + '</h3>';
                items.forEach(item => {
                    const escapedValue = escapeHtml(item.value);
                    html += '<div class="preview-item">' +
                            '<div class="preview-item-content">' +
                                '<div class="preview-key"><strong>' + item.key + '</strong></div>' +
                                '<div class="preview-value">' + escapedValue + '</div>' +
                            '</div>' +
                            (item.description ? '<div class="text-gray font-size-12 margin-top-3">' + item.description + '</div>' : '') +
                        '</div>';
                });
                html += '</div>';
            }
            
            preview.innerHTML = html || '<p class="text-gray padding-20 text-center">暂无配置</p>';
        })
        .catch(error => {
            console.error('Failed to load config for preview:', error);
            
            // 显示反代配置框
            if(proxyConfigContainer) {
                proxyConfigContainer.style.display = 'block';
                // 如果有已保存的URL，填充它
                const savedUrl = localStorage.getItem('logvar_api_base_url');
                if(savedUrl) {
                    document.getElementById('custom-base-url').value = savedUrl;
                }
            }
            
            preview.innerHTML = '<p class="text-red">加载配置失败: ' + error.message + '</p>';
            addLog('加载配置失败: ' + error.message, 'error');
        });
}

// 切换预览类别
function switchPreviewCategory(category, event = null) {
    currentPreviewCategory = category;
    // 更新按钮状态
    const section = document.getElementById('preview-section');
    if (section) {
        section.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    }
    if (event && event.target) {
        event.target.classList.add('active');
    }
    renderPreview();
}

// 获取类别名称
function getCategoryName(category) {
    const names = {
        api: 'API配置',
        source: '源配置',
        match: '匹配配置',
        danmu: '弹幕配置',
        cache: '缓存配置',
        system: '系统配置'
    };
    return names[category] || category;
}
`;
