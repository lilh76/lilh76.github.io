<style>
/* 添加淡蓝和淡绿的背景色 */
.publication-row:nth-child(odd) {
    background-color: rgba(240, 248, 255, 0.3); /* 淡蓝色 */
}

.publication-row:nth-child(even) {
    background-color: rgba(240, 255, 240, 0.3); /* 淡绿色 */
}

/* 可选：添加悬停效果增强视觉体验 */
.publication-row:hover {
    background-color: rgba(230, 230, 250, 0.5) !important; /* 悬停时淡紫色 */
    transition: background-color 0.3s ease;
}

/* 确保表格单元格继承背景色 */
.publication-row td {
    background-color: inherit;
}

/* 原有的样式保持不变 */
.pub-image {
    max-width: 200px;
    border-radius: 5px;
}

.papertitle {
    font-weight: bold;
    font-size: 18px;
}
</style>