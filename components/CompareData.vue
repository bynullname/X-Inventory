<template>
  <div class="comparisons-control">
    <div class="upload-area">
      <el-upload
        ref="upload"
        class="upload-demo"
        action="https://10.138.140.257"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
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
  </div>
</template>


  <script setup>
  import { ref, onMounted } from 'vue'
  import { Plus, Download, Share, Upload, Switch} from '@element-plus/icons-vue'
  import { useInventoryApi } from '~/composables/useInventoryApi';
  import { deviceConfig } from '~/config/index';

  const { startCompare, getCompareProgress } = useInventoryApi();
  const activeInventoryPlanId = useState('activeInventoryPlanId')
  const progress = ref(0);
  const isRunning = ref(false);
  let loadingInstance = null;

  // 启动比对
  const startComparison = async () => {
    const response = await startCompare();
    if (response.success) {
      ElMessage({
        message: '数据分析任务已启动',
        type: 'success',
      });
      queryProgress()
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


  const handleExport = () => {
    const downloadUrl = deviceConfig.apiUrl + '/api/export_inventory_items/'+ activeInventoryPlanId.value;
    window.open(downloadUrl, '_blank');
  };



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
