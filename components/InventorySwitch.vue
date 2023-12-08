  <template>
    <div class="inventory-control">
        <el-switch
            v-model="switchDialogVisible"
            class="mb-2 switch-style"
            size="large"
            active-text="盘点"
            inactive-text="停歇"
        />
        <div class="state">
          <el-text class="mx-1" type="primary" style="color: rgba(110, 110, 110,255);" size="large">本次盘点计划：{{ '2023年12月' }}</el-text>
          <el-text class="mx-1" type="primary" style="color: rgba(110, 110, 110,255);" size="large">已完成盘点库位数：{{ 32 }}</el-text>
        </div>
    </div>
    <el-dialog
      v-model="switchDialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="switchDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="switchDialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { Delete, Edit, Search,Download, Share, Upload, Switch} from '@element-plus/icons-vue'
  import { genFileId } from 'element-plus'
  import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
  import { useInventoryApi } from '~/composables/useInventoryApi'
  import { deviceConfig } from '~/config/index'; // 引入配置文件
  const switchDialogVisible = useState('switchDialogVisible')
  const { setInventoryCheckStatus, getInventoryCheckStatus } = useInventoryApi()
  const inventoryState = ref(false)


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
  