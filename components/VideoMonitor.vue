<template>
  <div class="video-monitor">
    <SingleCamera class="camera" label="左侧相机" dir="left" />
    <SingleCamera class="camera" label="右侧相机" dir="right"/>
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

</style>
