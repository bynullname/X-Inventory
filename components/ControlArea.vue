<template>
  <div class="center-container">
    

    <el-upload
      class="upload-demo"
      :action="uploadAction"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :headers="headers"
      :before-upload="beforeUpload"
    >
      <el-button :icon="ElIconUpload" type="success" class="button-style" @click="handleExport">上传WMS数据</el-button>
    </el-upload>
      <el-switch
          v-model="inventoryState"
          class="mb-2 switch-style"
          size="large"
          active-text="盘点"
          inactive-text="停歇"
          @change="handleSwitchChange"
      />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useInventoryApi } from '~/composables/useInventoryApi'
import { deviceConfig } from '~/config/index'; // 引入配置文件
const uploadAction = ref(`${deviceConfig.apiUrl}/api/upload_wms_excel`);

const { setInventoryCheckStatus, getInventoryCheckStatus } = useInventoryApi()
const inventoryState = ref(false)

// 当组件加载时，从服务器获取当前库存盘点状态
onMounted(async () => {
  try {
    const response = await getInventoryCheckStatus()
    if (response.success) {
      inventoryState.value = response.inventoryCheckStarted
    }
  } catch (error) {
    // 错误处理
    console.error('获取库存盘点状态失败:', error)
  }
})

// 监听开关状态的变化
const handleSwitchChange = async (newState) => {
  try {
    const response = await setInventoryCheckStatus(newState)
    if (response.message === 'Inventory check status updated') {
      // 使用三元运算符来确定提示消息
      const message = newState ? '开启盘点' : '关闭盘点'
      ElMessage({
        message: message,
        type: 'success',
      })
    }
  } catch (error) {
    // 错误处理
    console.error('设置库存盘点状态失败:', error)
    ElMessage.error('设置库存盘点状态失败:', error);

  }
}

</script>

<style scoped>
  .center-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    background-color: #ebebeb; /* 略深的灰色背景 */
  }

  .switch-style {
  }
  .button-style .el-icon {
    font-size: 1.2em;
  }
  
</style>