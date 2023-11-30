<template>
  <div class="video-monitor">
    <div class="image-container">
      <span class="camera-label">左侧相机</span>
      <img :src="leftImageUrl" @error="setDefaultImage" alt="Camera 1" />
    </div>
    <div class="image-container">
      <span class="camera-label">右侧相机</span>
      <img :src="rightImageUrl" @error="setDefaultImage" alt="Camera 1" />
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { deviceConfig } from '~/config/index';

const leftImageUrl = ref('/NoCamera.jpg');
const rightImageUrl = ref('/NoCamera.jpg');
const defaultImageUrl = '/NoCamera.jpg'; // 默认图片 URL

const setDefaultImage = (event) => {
  event.target.src = defaultImageUrl;
};

const updateImage = () => {
  // 每隔0.2秒更新图像 URL
  leftImageUrl.value = `${deviceConfig.apiUrl}/api/image_left?timestamp=${new Date().getTime()}`;
  rightImageUrl.value = `${deviceConfig.apiUrl}/api/image_right?timestamp=${new Date().getTime()}`;
};

onMounted(() => {
  setInterval(updateImage, 200);
});
</script>

<style scoped>
.video-monitor {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  padding: 20px;
  background-color: #f5f5f5;
}

.image-container {
  width: 640px;
  height: 496px;
  /* border: 3px solid #007bff; */
  box-shadow: 0 6px 7px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.image-container img {
  width: 100%;
  height: auto;
}

.camera-label {
  position: absolute;
  top: 10px;
  left: 50%; /* 将标签移至容器的左半部分 */
  transform: translateX(-50%); /* 使用 transform 中心对齐 */
  background-color: #007bff;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  font-size: 0.9em;
  line-height: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 媒体查询，针对手机端或小屏幕设备 */
@media (max-width: 750px) {
  .video-monitor {
    height: 100%;
    flex-direction: column;
    gap: 10px;
  }

  .image-container {
    width: 90%;
    height: 50%;
    border: 2px solid transparent;
    margin-bottom: 20px;
  }

  .camera-label {
    position: absolute;
    top: 10px;
    left: 50%; /* 将标签移至容器的左半部分 */
    transform: translateX(-50%); /* 使用 transform 中心对齐 */
    background-color: #007bff;
    padding: 5px 10px;
    color: white;
    border-radius: 5px;
    font-size: 0.6em;
    line-height: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
