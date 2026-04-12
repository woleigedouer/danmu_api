// language=CSS
export const responsiveCssContent = /* css */ `
/* 响应式样式 - Zen-iOS Hybrid Design */
@media (max-width: 768px) {
    body {
        padding: 10px;
    }

    .container {
        border-radius: 24px; /* Slightly smaller radius on mobile */
    }

    .header {
        padding: 20px;
        flex-direction: column;
        align-items: stretch;
    }

    .header-left {
        width: 100%;
        align-items: center;
        text-align: center;
    }
    
    .logo-title-container {
        flex-direction: column;
        gap: 10px;
    }

    .logo {
        width: 48px;
        height: 48px;
        font-size: 20px;
    }

    .header h1 {
        font-size: 20px;
    }

    .version-info {
        justify-content: center;
        margin-top: 8px;
        width: 100%;
        font-size: 11px;
    }

    .nav-buttons {
        width: 100%;
        justify-content: stretch;
        gap: 4px;
        background: rgba(118, 118, 128, 0.12);
        border-radius: 12px;
        padding: 4px;
    }

    .nav-btn {
        flex: 1;
        text-align: center;
        font-size: 12px;
        padding: 6px 2px;
        border-radius: 8px;
    }

    .content {
        padding: 20px;
    }

    .env-item {
        flex-direction: column;
        align-items: stretch;
        padding: 16px;
    }

    .env-item .env-info {
        min-width: 0; /* Fix flex overflow */
        width: 100%;
    }

    .env-item .env-info div.text-dark-gray {
        font-size: 13px;
        max-width: 100%;
    }

    .env-actions {
        width: 100%;
        margin-top: 12px;
        display: flex;
    }

    .env-actions .btn {
        flex: 1;
    }

    /* 预览卡片移动端 */
    .preview-category {
        padding: 16px;
    }

    .preview-item {
        padding: 12px;
    }

    .preview-item .preview-value {
        font-size: 12px;
    }
    
    .api-selector select {
        font-size: 16px; /* Prevent auto-zoom on iOS */
    }

    /* 配置编辑弹窗移动端适配 */
    #env-modal .modal-content {
        width: 95vw;
        max-width: none;
        padding: 24px 20px;
        border-radius: 24px;
        max-height: 90vh;
    }

    #env-modal .selected-tags {
        max-height: 120px;
    }

    #env-modal .available-tags {
        max-height: 150px;
    }

    #env-modal .modal-header {
        padding-bottom: 16px;
        margin-bottom: 20px;
    }

    #env-modal .modal-header h3 {
        font-size: 18px;
    }

    /* 推送弹幕移动端适配 */
    .anime-grid {
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 12px;
    }

    .anime-item-img {
        aspect-ratio: 3 / 4;
    }

    .anime-title {
        padding: 10px;
        font-size: 12px;
    }

    .episode-item {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        padding: 14px 16px;
    }

    .episode-item-content {
        white-space: normal;
    }

    .episode-push-btn {
        width: 100%;
    }

    #push-anime-list,
    #push-episode-list {
        padding: 16px;
        margin-top: 16px;
    }
}
`;

