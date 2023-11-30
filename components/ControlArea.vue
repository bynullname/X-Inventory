<template>
  <div class="center-container">
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

<style>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ebebeb; /* 略深的灰色背景 */
    padding: 20px; /* 添加一些内边距 */
    border-radius: 10px; /* 轻微的圆角边框 */
  }

  .switch-style {
    margin-right: 20px; /* 两个组件之间的间距 */
  }
</style>