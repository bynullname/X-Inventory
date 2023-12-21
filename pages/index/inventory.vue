<template>
  <div class="container">
    <Header :activeInventoryPlanId="activeInventoryPlanId" />
    <div class="main-content">
      <ControlArea class="control"/>
      <VideoMonitor class="monitor"/>
        <!-- <InventoryData :activeInventoryPlanId="activeInventoryPlanId"/> -->
    </div>
  </div>
  <LogoutButton />

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
  const loginForm = reactive({
    username: '',
    password: ''
  });

  //登陆
  const handleLogin = async (isShowMsg = false) => {
    try {
      const response = await $fetch(deviceConfig.apiUrl + '/api/check_login_status', {
        method: 'GET',
        credentials: 'include',  // 重要：允许携带跨域 cookie
      });

      if (response.success) {
        console.log('登录成功:', response.message);
        ElMessage({
          message: '登录成功',
          type: 'success', // 显示成功消息
          duration: 3000 // 消息显示时间，单位毫秒
        });
      } else {
        if(isShowMsg){
            ElMessage({
            message: '请先登陆',
            type: 'error', // 显示错误消息
            duration: 3000 // 消息显示时间，单位毫秒
          });
        }
        navigateTo('/');
      }
    } catch (error) {
      if(isShowMsg){
        ElMessage({
          message: '请先登陆',
          type: 'error', // 显示错误消息
          duration: 3000 // 消息显示时间，单位毫秒
        });
      }
      navigateTo('/');
    }
  };

  onMounted(async () => {
    await handleLogin(true)
    connectWebSocket(socketTf, deviceConfig.wsUrl, wsData, reconnectInterval, data => {
      useNotifyResult(data)
    });
  });

</script>

<style scoped> 
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
  animation: slideDown 1s cubic-bezier(0.25, 0.8, 0.25, 1);

}

.monitor{
  flex: 1; /* 占据剩余空间 */
  width: 100%;
  overflow-y: auto; /* 如果内容超出高度，允许滚动 */
}

@keyframes slideDown {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}


</style>

