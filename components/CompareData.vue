<template>
  <div class="comparisons-control">
    <div class="upload-area">
      <el-upload
        ref="upload"
        class="upload-demo"
        :action="uploadUrl"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
      >
        <template #trigger>
          <el-button :icon="Plus" type="primary">&ensp;选择文件&ensp;</el-button>
        </template>
        <el-button class="upload-btn" type="success" :icon="Upload" @click="submitUpload">
          &ensp;确认提交&ensp;
        </el-button>
      </el-upload>
      <div class="file-name-display"></div>
    </div>
    <div class="button-group">
      <el-button type="primary" :icon="Switch" @click="startComparison">比对结果</el-button>
      <el-button type="primary" :icon="Download" @click="handleExport">下载结果</el-button>
    </div>
    <el-dialog
      v-model="switchDialogVisible"
      title="确认操作"
      width="30%"
    >
      <span>即将比对的 WMS 文件是：{{ activeWmsFileName }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="switchDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAndStartComparison">确认</el-button>
        </span>
      </template>
  </el-dialog>
  </div>
</template>


  <script setup lang="ts">
  import { ref, onMounted, watch} from 'vue'
  import { Plus, Download, Share, Upload, Switch} from '@element-plus/icons-vue'
  import { useInventoryApi } from '~/composables/useInventoryApi';
  import { deviceConfig } from '~/config/index';
  import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
  import { genFileId } from 'element-plus'

  const { setInventorySwitchStatus, startCompare, getCompareProgress,fetchActiveWmsExcel } = useInventoryApi();
  const activeInventoryPlanId = useState('activeInventoryPlanId')
  const progress = ref(0);
  const isRunning = ref(false);
  let loadingInstance:any = null;
  const upload = ref<UploadInstance>()
  const uploadUrl = computed(() => deviceConfig.apiUrl + '/api/upload_wms_excel') // 设置上传的目标 URL
  const activeWmsFileName = ref(''); // 存储当前活跃的 WMS 文件名
  const switchDialogVisible = ref(false)
  const inventoryState = useState('inventoryState')

  // 启动比对
  // 修改 startComparison 函数以打开对话框
  const startComparison = async () => {
    // 获取当前活跃的 WMS 文件名
    const wmsFileNameResponse = await fetchActiveWmsExcel(); // 确保已经实现了 fetchActiveWmsExcel
    if (wmsFileNameResponse.success) {
      activeWmsFileName.value = wmsFileNameResponse.activeWmsExcel;
      switchDialogVisible.value = true; // 打开对话框
    } else {
      ElMessage.error(`获取活跃 WMS 文件失败: ${wmsFileNameResponse.message}`);
    }
  };

  // 在用户确认后执行比对
  const confirmAndStartComparison = async () => {
    // 关闭盘点功能
    inventoryState.value = false
    await setInventorySwitchStatus(inventoryState.value)

    switchDialogVisible.value = false; // 关闭对话框
    // 执行原有的比对逻辑
    const response:any = await startCompare();
    if (response.success) {
      ElMessage({
        message: '数据分析任务已启动',
        type: 'success',
      });
      queryProgress();
    } else {
      ElMessage.error(`启动数据分析失败: ${response.message}`);
    }
  };

  // 查询进度并处理全屏加载状态
  const queryProgress = async () => {
    const response = await getCompareProgress();
    if (response.success) {
      progress.value = response.progress;
      isRunning.value = response.isRunning;

      if (isRunning.value && !loadingInstance) {
        // 如果任务正在运行且尚未创建加载实例，则创建之
        loadingInstance = ElLoading.service({
          lock: true,
          text: `请耐心等待，有正在执行比对数据的任务 (进度: ${progress.value}%)`,
          background: 'rgba(0, 0, 0, 0.7)',
        });
      } else if (loadingInstance) {
        // 更新加载文本以反映当前进度
        loadingInstance.setText(`请耐心等待，有正在执行比对数据的任务 (进度: ${progress.value}%)`);
        
        if (!isRunning.value) {
          // 如果任务已完成且加载实例存在，则关闭它
          loadingInstance.close();
          loadingInstance = null; // 重置加载实例引用
        }
      }
    }
  };

  // 监控比对任务的运行状态
  watch(isRunning, (newVal, oldVal) => {
    if (oldVal === true && newVal === false) {
      // 任务刚刚完成，触发下载
      handleExport();
    }
  })

  // 挂载时开始定时查询进度
  onMounted(() => {
    const interval = setInterval(() => {
      queryProgress();
      if (!isRunning.value && loadingInstance) {
        clearInterval(interval);
        loadingInstance.close();
        loadingInstance = null;
      }
    }, 1000); // 每隔1000ms查询一次
  });

  // 导出
  const handleExport = () => {
    const downloadUrl = deviceConfig.apiUrl + '/api/export_inventory_items/'+ activeInventoryPlanId.value;
    window.open(downloadUrl, '_blank');
  };

  const handleUploadSuccess = (response: any, file: UploadRawFile, fileList: UploadRawFile[]) => {
    ElMessage({
      message: '上传成功: ' + response.message,
      type: 'success',
    });
  };

  const handleUploadError = (err: Error, file: UploadRawFile, fileList: UploadRawFile[]) => {
    ElMessage.error('上传失败: ' + err.message);
  };

  const handleExceed: UploadProps['onExceed'] = (files: File[]) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
  }

  const submitUpload = () => {
    upload.value!.submit()
  }

  </script>
  
  <style scoped>
.comparisons-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 100px; /* 固定高度，包括上传按钮和文件名显示 */
}

.file-name-display {
  height: 24px; /* 预留空间用于显示文件名 */
}

.upload-btn {
  margin-left: 8px;
}

.button-group {
  display: flex;
  gap: 8px;
  position: relative; /* 相对定位，确保不受其他元素影响 */
  top: -24px; /* 向上移动，以适应文件名显示区域的高度 */
}

.el-button {
  transition: all 0.3s ease;
}

.el-button:hover {
  transform: translateY(-2px);
}
</style>
