<template>
  <div class="container">
    <Header :activeInventoryPlanId="activeInventoryPlanId" />
    <div class="main-content">
      <ControlArea class="control"/>
      <VideoMonitor class="monitor"/>
        <!-- <InventoryData :activeInventoryPlanId="activeInventoryPlanId"/> -->
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
  const activeInventoryPlanId = useState('activeInventoryPlanId')


  const isMobile = useIsMobile();
  const { connectWebSocket } = useWebSocket();
  let socketTf, socketPointCloud;
  const wsData = ref([]);
  let reconnectInterval;



  onMounted(async () => {
    connectWebSocket(socketTf, deviceConfig.wsUrl, wsData, reconnectInterval, data => {
      useNotifyResult(data)
    });
  });

</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
    margin-top: 70px;
    height: calc(100vh - 70px); /* 减去 Header 的高度 */
    overflow-y: hidden; /* 防止内容超出并滚动 */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-image: url('/monitorBG.webp'); /* 添加背景图 */
    background-size: cover; /* 确保背景图覆盖整个容器 */
    background-position: center; /* 背景图居中 */
}

.control{
  /* width: 100%; */
  height: 150px;
  min-height: 150px;
}

.monitor{
  flex: 1; /* 占据剩余空间 */
  width: 100%;
  overflow-y: auto; /* 如果内容超出高度，允许滚动 */
}

</style>

