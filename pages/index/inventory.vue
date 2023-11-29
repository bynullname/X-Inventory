<template>
  <div class="container">
    <Header :activeInventoryPlanId="activeInventoryPlanId" />
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
  import { deviceConfig } from '~/config/index';
  import { useIsMobile } from '~/composables/useIsMobile';
  import useWebSocket from '~/composables/useWebSocket';
  import {useNotifyResult} from '~/composables/useNotifyResult'
  import { useInventoryApi } from '~/composables/useInventoryApi'; // 确保这里的路径正确
  import { ElMessage } from 'element-plus'

  const { fetchActiveInventoryPlan } = useInventoryApi();
  const activeInventoryPlanId = ref(null);


  const isMobile = useIsMobile();
  const { connectWebSocket } = useWebSocket();
  let socketTf, socketPointCloud;
  const wsData = ref([]);
  let reconnectInterval;


  onMounted(async () => {
    const response = await fetchActiveInventoryPlan();
    if (response.success) {
      activeInventoryPlanId.value = response.activeInventoryPlanId;
    } else {
      ElMessage.error(response.message);
    }
    connectWebSocket(socketTf, deviceConfig.wsUrl, wsData, reconnectInterval, data => {
      useNotifyResult(data)
    });
  });

</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}

.main-content {
  padding-top: 70px; /* 适当调整以适应 Header 的高度 */
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
</style>

