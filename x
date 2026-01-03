
/* 窄屏布局 - 当屏幕宽度小于768px时 */
@media screen and (max-width: 768px) {
  .floating-back-btn {
    top: auto !important;
    bottom: 20px !important;
    left: auto !important;
    right: 20px !important;
    transform: none !important;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  .floating-back-btn:hover {
    transform: translateY(-2px) !important;
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
    padding: 10px 14px;
    max-width: 140px;
  }
  
  .pub-image {
    max-width: 95%;
  }
  
  .image-cell,
  .content-cell {
    padding: 10px 15px;
  }
}