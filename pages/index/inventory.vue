<template>
  <div class="container">
    <Header />
    <div class="main-content">
      <div v-if="isMobile">
        <van-swipe class="my-swipe" indicator-color="white">
          <van-swipe-item>
            <VideoMonitor />
          </van-swipe-item>
          <van-swipe-item>
            <InventoryData />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div v-else>
        <VideoMonitor />
        <ControlArea />
        <InventoryData />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const isMobile = computed(() => {
  return window.innerWidth <= 600;
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}

.main-content {
  padding-top: 80px; /* 适当调整以适应 Header 的高度 */
}

/* 移动端的样式 */
@media screen and (max-width: 600px) {
  .container {
    height: 100vh; /* 视口的全高 */
  }

  .main-content {
    height: calc(100vh - 80px); /* 减去 Header 的高度 */
    overflow-y: hidden; /* 防止内容超出并滚动 */
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    height: 100%;
  }
}

/* PC端的样式不需要特别调整 */
</style>

