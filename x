/* 窄屏布局 - 当屏幕宽度小于1200px时 */
@media screen and (max-width: 1200px) {
  .floating-back-btn {
    top: auto !important;
    bottom: 20px !important;
    left: auto !important;
    right: 20px !important;
    transform: none !important;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    padding: 10px 15px; /* 减小内边距 */
    max-width: 140px; /* 减小最大宽度 */
  }
  
  .floating-back-btn:hover {
    transform: translateY(-2px) !important;
  }
  
  .floating-back-btn a {
    font-size: 1em; /* 减小字体大小 */
  }
  
  .floating-back-btn .emoji {
    font-size: 1.1em; /* 减小emoji大小 */
  }
  
  .floating-sub-text {
    font-size: 0.85em; /* 减小子文本大小 */
    margin-top: 2px; /* 减小上边距 */
  }
  
  .publication-row {
    display: block;
  }
  
  .image-cell,
  .content-cell {
    display: block;
    width: 100% !important;
    padding: 10px 20px;
  }
  
  .image-cell {
    text-align: center;
    padding-bottom: 0;
  }
  
  .pub-image {
    max-width: 80%;
    width: auto;
    margin: 0 auto;
  }
}

/* 更窄的屏幕 - 当屏幕宽度小于480px时 */
@media screen and (max-width: 480px) {
  .floating-back-btn {
    bottom: 15px !important;
    right: 15px !important;
    padding: 8px 12px; /* 进一步减小内边距 */
    max-width: 120px; /* 进一步减小最大宽度 */
  }
  
  .floating-back-btn a {
    font-size: 0.95em; /* 进一步减小字体大小 */
  }
  
  .floating-back-btn .emoji {
    font-size: 1em; /* 进一步减小emoji大小 */
  }
  
  .floating-sub-text {
    font-size: 0.8em; /* 进一步减小子文本大小 */
    margin-top: 1px; /* 进一步减小上边距 */
  }
  
  .pub-image {
    max-width: 95%;
  }
  
  .image-cell,
  .content-cell {
    padding: 10px 15px;
  }
}