<template>
    <div class="video-monitor">
      <div class="image-container">
        <img src="/test.jpeg" alt="Camera 1" />
      </div>
      <div class="image-container">
        <img src="/test.jpeg" alt="Camera 2" />
      </div>
    </div>
  </template>
  
<style scoped>
.video-monitor {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px; /* 图像容器之间的间距 */
  padding: 20px;
  background-color: #f5f5f5; /* 淡灰色背景 */
}

.image-container {
  width: 640px; /* 图像容器的宽度 */
  height: 496px; /* 图像容器的高度 */
  border: 1px solid #ccc; /* 边框样式 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 确保图片不会超出容器范围 */
}

.image-container img {
  width: 100%; /* 图像宽度填满容器 */
  height: auto; /* 图像高度自动调整 */
}

/* 媒体查询，针对手机端或小屏幕设备 */
@media (max-width: 750px) {
  .video-monitor {
    display: flex;
    flex-direction: column; /* 在手机端，子元素垂直排列 */
    justify-content: center;
    align-items: center;
    gap: 40px; /* 图像容器之间的间距 */
    padding: 20px;
    background-color: #f5f5f5; /* 淡灰色背景 */
  }

  .image-container {
    /* width: 90%;  */
    max-width: 90%;
    height: 40%;
    border: 1px solid #ccc; /* 边框样式 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* 确保图片不会超出容器范围 */
  }

}
</style>

  