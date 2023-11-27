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

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

/* PC端的样式 */
@media screen and (min-width: 601px) {
  .my-swipe {
    display: none; /* 隐藏滑动组件 */
  }
}
</style>
