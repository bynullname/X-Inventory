<template>
  <div class="inventory-control">
      <el-switch
          v-model="localInventoryState"
          class="mb-2 switch-style"
          size="large"
          active-text="盘点"
          inactive-text="停歇"
          @change="promptSwitchChange"
      />
      <div class="state">
        <el-text class="mx-1" type="primary" style="color: rgba(110, 110, 110,255);" size="large">本次盘点计划：{{ activeInventoryPlanId }}</el-text>
        <el-text class="mx-1" type="primary" style="color: rgba(110, 110, 110,255);" size="large">已完成盘点库位数：{{ totalInventoryCount }}</el-text>
      </div>
  </div>
  <el-dialog
    v-model="switchDialogVisible"
    title="确认操作"
    width="30%"
    :before-close="handleClose"
  >
    <span>您确定要{{ inventoryState ? '启动' : '停止' }} ' {{ activeInventoryPlanId }} ' 盘点吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelSwitchChange">取消</el-button>
        <el-button type="primary" @click="confirmSwitchChange">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { Delete, Edit, Search,Download, Share, Upload, Switch} from '@element-plus/icons-vue'
  import { genFileId } from 'element-plus'
  import { useInventoryApi } from '~/composables/useInventoryApi'
  import { deviceConfig } from '~/config/index'; // 引入配置文件
  const { fetchActiveInventoryPlan, setInventorySwitchStatus, getInventorySwitchStatus,fetchTotalInventoryItemsCountByPlan } = useInventoryApi()
  const switchDialogVisible = ref(false)

  const localInventoryState = ref(false) // 本地状态
  const inventoryState = useState('inventoryState',()=>false)

  const activeInventoryPlanId = useState('activeInventoryPlanId',()=>'')
  const totalInventoryCount = useState('totalInventoryCount',()=>0)
  const isMute = useState('isMute',()=>true)

  let intervalId = null; // 用于存储定时器的引用

  // 当用户切换开关时调用
  const promptSwitchChange = () => {
    switchDialogVisible.value = true
  }

  // 用户确认盘点状态改变
  const confirmSwitchChange = async () => {
    switchDialogVisible.value = false
    try {
      const response = await setInventorySwitchStatus(localInventoryState.value)
      if (response.message === 'Inventory check status updated') {
        ElMessage({
          message:localInventoryState.value ? '盘点已开启' : '盘点已关闭',
          type: 'success',
        })
        inventoryState.value = localInventoryState.value; // 同步本地状态到全局状态
        isMute.value = false
      }
    } catch (error) {
      ElMessage.error('设置库存盘点状态失败')
      localInventoryState.value = !localInventoryState.value // 重置状态
    }
  }

  // 用户取消盘点状态改变
  const cancelSwitchChange = () => {
    switchDialogVisible.value = false
    // 重置开关状态
    inventoryState.value = !inventoryState.value
  }

  const updateTotalInventoryCount = async () => {
    try {
      const response = await fetchTotalInventoryItemsCountByPlan(activeInventoryPlanId.value);
      if (response.success) {
        totalInventoryCount.value = response.count;
      } else {
        ElMessage.error(response.message);
      }
    } catch (error) {
      console.error('定时获取已盘点总量失败:', error);
    }
  };

  onMounted(async () => {
    try {
      const response = await fetchActiveInventoryPlan();
      if (response.success) {
        activeInventoryPlanId.value = response.activeInventoryPlanId;
      } else {
        ElMessage.error(response.message);
      }
    } catch (error) {
      console.error('获取库存盘点计划失败:', error)
    }

    try {
      const response = await getInventorySwitchStatus()
      if (response.success) {
        localInventoryState.value =  inventoryState.value = response.inventory_switch_status
      } else {
        ElMessage.error(response.message);
      }
    } catch (error) {
      console.error('获取库存盘点状态失败:', error)
    }

    // 设置定时器
    intervalId = setInterval(() => {
      updateTotalInventoryCount();
    }, 1000); // 每1000毫秒（1秒）调用一次

  })

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId); // 清除定时器
  }
});
  </script>

  <style scoped> 
    .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .inventory-control{
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      gap: 8px;
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


  </style>
  