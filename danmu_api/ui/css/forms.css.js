// language=CSS
export const formsCssContent = /* css */ `
/* 表单样式 - Zen-iOS Hybrid Design */
.form-group {
    margin-bottom: 24px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 11px;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 12px; /* Smooth corners */
    font-size: 14px;
    background-color: rgba(245, 245, 247, 0.5); /* #F5F5F7 50% */
    color: var(--text-primary);
    box-shadow: var(--shadow-inner); /* Inner shadow for depth */
    transition: all 0.2s;
    outline: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    background-color: #FFFFFF;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(28, 28, 30, 0.1); /* Focus ring */
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
    font-family: 'SF Mono', 'Menlo', monospace;
    line-height: 1.5;
}

/* 开关按钮 (iOS style) */
.switch-container {
    display: flex;
    align-items: center;
    gap: 12px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 52px;
    height: 32px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(120, 120, 128, 0.16); /* iOS gray */
    transition: .3s cubic-bezier(0.25, 1, 0.5, 1);
    border-radius: 32px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 28px;
    width: 28px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .3s cubic-bezier(0.25, 1, 0.5, 1);
    border-radius: 50%;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15), 0 3px 1px rgba(0, 0, 0, 0.06);
}

input:checked + .slider {
    background-color: var(--success-color); /* Green for on */
}

input:checked + .slider:before {
    transform: translateX(20px);
}

.switch-label {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 14px;
}

/* 数字滚轮 */
.number-picker {
    display: flex;
    align-items: center;
    gap: 20px;
    background: rgba(255, 255, 255, 0.5);
    padding: 20px;
    border-radius: 16px;
    border: 1px solid rgba(0,0,0,0.05);
}

.number-display {
    font-size: 40px;
    font-weight: 800;
    color: var(--text-primary);
    min-width: 70px;
    text-align: center;
    font-variant-numeric: tabular-nums;
}

.number-controls {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.number-btn {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(0,0,0,0.1);
    background: white;
    color: var(--text-primary);
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.number-btn:hover {
    background: #F5F5F7;
    transform: translateY(-1px);
}

.number-btn:active {
    transform: scale(0.95);
    background: #E5E5EA;
}

/* Range Slider */
.number-range input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: rgba(120, 120, 128, 0.16);
    outline: none;
    padding: 0;
    box-shadow: none;
    border: none;
}

.number-range input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15), 0 3px 1px rgba(0, 0, 0, 0.06);
    border: 0.5px solid rgba(0,0,0,0.04);
}

/* 标签选择 */
.tag-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.tag-option {
    padding: 8px 16px;
    background: #FFFFFF;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
}

.tag-option:hover {
    background: #F5F5F7;
    color: var(--text-primary);
}

.tag-option.selected {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

/* 多选区域 */
.selected-tags {
    min-height: 80px;
    background: rgba(245, 245, 247, 0.5);
    border: 1px dashed rgba(0,0,0,0.15);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: flex-start;
    box-shadow: var(--shadow-inner);
}

.selected-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--primary-color);
    color: white;
    padding: 8px 16px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    cursor: move;
}

.selected-tag .remove-btn {
    width: 20px;
    height: 20px;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
    font-size: 12px;
}

.selected-tag .remove-btn:hover {
    background: rgba(255,255,255,0.4);
}

.available-tags {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.available-tag {
    padding: 6px 14px;
    background: #FFFFFF;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary);
    transition: all 0.2s;
    display: inline-flex;
    cursor: pointer;
}

.available-tag:hover {
    transform: translateY(-1px);
    border-color: rgba(0,0,0,0.2);
}

.available-tag.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
}

/* 合并模式控制区 */
.merge-mode-controls {
    display: flex;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 12px;
    gap: 0;
}

.merge-mode-btn {
    display: inline-flex;
    align-items: center;
    padding: 0;
    background: transparent;
    border: none;
    color: var(--accent-color);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    position: relative;
}

.merge-mode-btn:hover {
    color: #005ecb;
}

.merge-mode-btn:active {
    opacity: 0.6;
}

.merge-mode-btn.active {
    color: var(--success-color);
}

.merge-mode-controls .form-help {
    font-size: 12px;
    color: var(--text-secondary);
    margin: 0;
    margin-left: 10px;
}

/* 暂存区 */
.staging-area {
    display: none;
    min-height: 60px;
    background: rgba(255, 243, 205, 0.3);
    border: 1px dashed rgba(255, 193, 7, 0.4);
    border-radius: 12px;
    padding: 12px;
    margin-top: 12px;
    margin-bottom: 12px;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    position: relative;
}

.staging-area.active {
    display: flex;
}

.staging-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 193, 7, 0.15);
    color: var(--text-primary);
    padding: 6px 12px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid rgba(255, 193, 7, 0.3);
    cursor: move;
}

.staging-tag.dragging {
    opacity: 0.5;
}

.staging-tag.drag-over {
    border-color: var(--accent-color);
    background: rgba(0, 122, 255, 0.1);
}

.staging-tag .remove-btn {
    width: 16px;
    height: 16px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
    font-size: 11px;
    line-height: 1;
}

.staging-tag .remove-btn:hover {
    background: rgba(0, 0, 0, 0.2);
}

.confirm-merge-btn {
    width: 32px;
    height: 32px;
    background: var(--success-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(52, 199, 89, 0.3);
    margin-left: auto;
}

.confirm-merge-btn:hover {
    background: #2fb350;
    transform: scale(1.05);
}

.confirm-merge-btn:active {
    transform: scale(0.95);
}

/* Map items */
.map-item {
    background: #FFFFFF;
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
}

.map-input-left, .map-input-right {
    background: #F5F5F7;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    font-family: 'SF Mono', monospace;
    font-size: 13px;
}
`;