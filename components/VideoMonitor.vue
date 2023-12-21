<template>
  <div class="video-monitor">
    <SingleCamera class="camera left" label="左侧相机" dir="left" />
    <SingleCamera class="camera right" label="右侧相机" dir="right"/>
  </div>
</template>

<script setup>

</script>

<style scoped>
.video-monitor {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 20px;
  background-color: transparent;
}

.camera{
  width: 45%;
  max-width: 1080px;
  height: auto;
}

.camera-control {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 设置按钮之间的间距 */
}

/* 定义左侧相机入场动画 */
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

/* 定义右侧相机入场动画 */
@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.camera.left {
  animation: slideInFromLeft 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

.camera.right {
  animation: slideInFromRight 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

</style>
