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
  import { useIsMobile } from '~/composables/useIsMobile';
  import useWebSocket from '~/composables/useWebSocket';

  const isMobile = useIsMobile();
  const { connectWebSocket } = useWebSocket();
  let socketTf, socketPointCloud;
  const wsData = ref([]);
  let reconnectInterval;




  onMounted(() => {
    connectWebSocket(socketTf, 'ws://192.168.31.177:7878', wsData, reconnectInterval, data => {
      if(data.msgType==='newItem'){
        console.log(data.msg)
        if(data.msg.inventory_result==='正常')
        {
          ElMessage({
            message: data.msg.location_number + ' : ' + '正常',
            type: 'success',
          })
        }else if(data.msg.inventory_result==='异常'){
          if(data.msg.remarks==='有货无码')
          {
            ElMessage({
              message: data.msg.location_number + ' : ' + '异常:有货无码',
              type: 'warning',
            })
          }else if(data.msg.remarks==='无货无码'){
            ElMessage({
              message: data.msg.location_number + ' : ' + '异常:无货无码',
              type: 'warning',
            })
          }
          else{
            ElMessage.error('其他错误')
          }
        }
        else{
            ElMessage.error('其他错误')
        }
      }
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

