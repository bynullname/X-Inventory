<template>
  <div class="center-container">
    <div class="sub-container inventory-control">
      <el-switch
          v-model="inventoryState"
          class="mb-2 switch-style"
          size="large"
          active-text="盘点"
          inactive-text="停歇"
          @change="dialogVisible = true"
      />
      <div class="state">
        <el-text class="mx-1" type="primary" style="color: rgba(110, 110, 110,255);" size="large">本次盘点计划：{{ '2023年12月' }}</el-text>
        <el-text class="mx-1" type="primary" style="color: rgba(110, 110, 110,255);" size="large">已完成盘点库位数：{{ 32 }}</el-text>
      </div>
    </div>

    <div class="sub-container roi-control">
      <div class="roi-grid">
        <div>
          <el-text class="label-text" type="primary">Top</el-text>
          <el-input-number v-model="numTop" :precision="2" :step="0.1" :max="10" />
        </div>
        <div>
          <el-text class="label-text" type="primary">Bottom</el-text>
          <el-input-number v-model="numBottom" :precision="2" :step="0.1" :max="10" />
        </div>
        <div>
          <el-text class="label-text" type="primary">Left</el-text>
          <el-input-number v-model="numLeft" :precision="2" :step="0.1" :max="10" />
        </div>
        <div>
          <el-text class="label-text" type="primary">&ensp;Right&ensp;</el-text>
          <el-input-number v-model="numRight" :precision="2" :step="0.1" :max="10" />
        </div>
      </div>
      <div class="roi-save">
        <el-button>保 存</el-button>
      </div>
    </div>


    <div class="sub-container comparisons-control">
      
    </div>


    <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useInventoryApi } from '~/composables/useInventoryApi'
import { deviceConfig } from '~/config/index'; // 引入配置文件
const dialogVisible = ref(false)

const uploadAction = ref(`${deviceConfig.apiUrl}/api/upload_wms_excel`);

const { setInventoryCheckStatus, getInventoryCheckStatus } = useInventoryApi()
const inventoryState = ref(false)
const numTop = ref(0)
const numBottom = ref(0)
const numLeft = ref(0)
const numRight = ref(0)
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
  // try {
  //   const response = await setInventoryCheckStatus(newState)
  //   if (response.message === 'Inventory check status updated') {
  //     // 使用三元运算符来确定提示消息
  //     const message = newState ? '开启盘点' : '关闭盘点'
  //     ElMessage({
  //       message: message,
  //       type: 'success',
  //     })
  //   }
  // } catch (error) {
  //   // 错误处理
  //   console.error('设置库存盘点状态失败:', error)
  //   ElMessage.error('设置库存盘点状态失败:', error);
  // }
}

</script>

<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  .center-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    gap: 100px;
    /* background-color: #c3e2e9;  */
    background-color: transparent;
    margin-top: 10px;
  }

  .sub-container{
    height: 80%;
    width: 400px;
    min-width: 400px;
    background-color: rgba(192, 209, 224, 0.839);
    border-radius: 10px;
    /* box-shadow: 5px 15px 50px rgba(83, 95, 100, 0.6);  */
    box-shadow: var(--el-box-shadow-dark);
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .inventory-control .state{
    display: flex;
    flex-direction: column;
    gap:10px;
  }

  .inventory-control .time{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .roi-control .roi-grid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 10px; /* 可以根据需要调整间距 */
    align-items: center;
    justify-content: center; /* 使得整个网格在容器中居中 */
  }

  .roi-control{
    width: 450px;
    justify-content: center;
    gap: 8px;
  }

  .roi-control .roi-grid div {
    display: flex;
    flex-direction: row;
    align-items: center; /* 确保标签和输入框垂直居中 */
    gap: 5px;
  }

  .roi-control .label-text {
    /* margin-bottom: 10px;  */
  }

  .switch-style {
  }
  .button-style .el-icon {
    font-size: 1.2em;
  }
  
</style>