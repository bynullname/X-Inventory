<template>
  <header class="header">
    <NuxtLink to="/">
      <img class="logo" src="/logo.png" alt="Logo">
    </NuxtLink>    
    <h1 class="title">X-Inventory</h1>
    
    <el-button style="margin-left: 15px;" type="primary" :icon="!isMute ? Bell : MuteNotification " circle @click="isMute = !isMute" />
    <el-button style="margin-left: 15px;" type="primary" :icon="Picture" circle @click="openBinsPage" />

  
    <div class="inventory-plan-wrapper" v-if="!isMobile">
      <div class="inventory-plan">
        <span>当前盘点计划</span>
        <span>{{ activeInventoryPlanId }}</span>
      </div>
    </div>
  </header>
</template>


<script lang="ts" setup>
  import { useIsMobile } from '~/composables/useIsMobile';
  import { Bell, MuteNotification, Picture} from '@element-plus/icons-vue'
  import { tr } from 'element-plus/es/locale';
  import { deviceConfig } from '~/config/index';
  const router = useRouter();

  const isMute = useState('isMute',()=>true)

  const isMobile = useIsMobile();
  const activeInventoryPlanId = useState('activeInventoryPlanId',()=>'')

  function openBinsPage() {
    window.location.href = deviceConfig.binsUrl;
    // alert(deviceConfig.binsUrl)
  }

  // 监听 isMute.value 的变化
  watch(() => isMute.value, (newValue) => {
    if (newValue) {
      ElMessage({
        message: '关闭提示音',
        type: 'info'
      });
    } else {
      ElMessage({
        message: '开启提示音',
        type: 'info'
      });
    }
  });
  </script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: rgb(50, 41, 41);
  color: white;
  padding: 10px 20px;
  position: fixed;  /* 固定定位 */
  top: 0;          /* 在顶部 */
  width: 100%;     /* 宽度充满屏幕 */
  z-index: 1000;   /* 确保在页面内容上方 */
}

.logo {
  height: 50px; /* 根据你的 Logo 尺寸调整 */
  margin-right: 20px;
}

.title {
  font-size: 24px;
  margin: 0;
}


.inventory-plan-wrapper {
  margin-left: auto; /* 自动左边距，推到右边 */
  padding: 0 50px; /* 增加一些内边距 */

}

.inventory-plan {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
}



</style>
