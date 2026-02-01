// language=CSS
export const baseCssContent = /* css */ `
/* 基础样式 - Zen-iOS Hybrid Design */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');

:root {
    --bg-base: #F2F2F7;
    --bg-card: rgba(255, 255, 255, 0.65);
    --bg-glass: rgba(255, 255, 255, 0.4);
    --text-primary: #1C1C1E;
    --text-secondary: #6C6C70;
    --primary-color: #1C1C1E; /* 深空黑 */
    --accent-color: #007AFF; /* iOS Blue for interactions */
    --danger-color: #FF3B30;
    --success-color: #34C759;
    --warning-color: #FFCC00;
    
    --shadow-floating: 0 24px 48px -12px rgba(0, 0, 0, 0.08);
    --shadow-card: 0 4px 12px rgba(0, 0, 0, 0.03);
    --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    
    --radius-xl: 40px;
    --radius-lg: 24px;
    --radius-md: 16px;
    --radius-sm: 8px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
    background-color: var(--bg-base);
    color: var(--text-primary);
    min-height: 100vh;
    padding: 20px;
    line-height: 1.5;
}

/* 容器：极致毛玻璃 + 双层物理描边 */
.container {
    max-width: 1200px;
    margin: 0 auto;
    background: var(--bg-card);
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-floating);
    border: 1px solid rgba(255, 255, 255, 0.6); /* 内描边 */
    position: relative;
    overflow: hidden;
}

/* 模拟外描边 (通过伪元素或 box-shadow 也可以，这里用 outline 保持 dom 干净) */
.container::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: var(--radius-xl);
    padding: 1px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.02));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 1;
}

.header {
    background: rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 30px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.header-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
}

.logo-title-container {
    display: flex;
    align-items: center;
    gap: 18px;
}

.logo {
    width: 56px;
    height: 56px;
    background: #fff;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.03);
}

.logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.header h1 {
    font-size: 28px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    margin: 0;
}

.version-info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
}

.version-badge {
    background: rgba(0, 0, 0, 0.04);
    padding: 4px 12px;
    border-radius: 100px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.update-badge {
    background: rgba(255, 204, 0, 0.15);
    color: #997a00;
    padding: 4px 12px;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s;
}

.update-badge:hover {
    background: rgba(255, 204, 0, 0.25);
}

.api-endpoint-badge span {
    font-family: 'SF Mono', 'Menlo', monospace;
    font-size: 11px;
}

.content {
    padding: 40px;
}

.section {
    display: none;
    animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); /* iOS easeOut */
}

.section.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

h2 {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin-bottom: 24px;
    color: var(--text-primary);
}

/* Footer */
.footer {
    padding: 40px;
    text-align: center;
    font-size: 12px;
    color: var(--text-secondary);
    border-top: 1px solid rgba(0,0,0,0.05);
    background: rgba(255,255,255,0.3);
}

.footer-text {
    color: var(--text-secondary);
    margin: 8px 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
}

.footer-links {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
}

.footer-link {
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 600;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.footer-link:hover {
    opacity: 1;
}

.github-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.github-icon {
    width: 14px;
    height: 14px;
    opacity: 0.8;
}

.tg-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.tg-icon {
    width: 14px;
    height: 14px;
    opacity: 0.8;
}

/* 滚动条美化 */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
}

/* 工具类 */
.text-gray {
    color: var(--text-secondary);
}

.text-dark-gray {
    color: #333;
}

.text-red {
    color: var(--danger-color);
}

.text-center {
    text-align: center;
}

.font-size-12 {
    font-size: 12px;
}

.margin-top-3 {
    margin-top: 3px;
}

.margin-bottom-15 {
    margin-bottom: 15px;
}

.padding-20 {
    padding: 20px;
}

.text-monospace {
    font-family: 'SF Mono', 'Menlo', monospace;
}
`;

