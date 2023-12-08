<template>
  <div class="comparisons-control">
    <el-upload
        ref="upload"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button type="primary">选择WMS文件</el-button>
        </template>
        <el-button class="ml-3" type="success" style="margin-left:30px ;" @click="submitUpload">
          确认上传
        </el-button>
        <template #tip>
          <div class="el-upload__tip text-red">
            只接受xls xlsx文件，限制数量1个
          </div>
        </template>
      </el-upload>
      <div>
        <el-button type="primary" :icon="Switch">比对结果</el-button>
        <el-button type="primary" :icon="Download" @click="">下载比对结果</el-button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { Delete, Edit, Search,Download, Share, Upload, Switch} from '@element-plus/icons-vue'
  import { genFileId } from 'element-plus'
  import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
  import { useInventoryApi } from '~/composables/useInventoryApi'
  import { deviceConfig } from '~/config/index'; // 引入配置文件
  const uploadAction = ref(`${deviceConfig.apiUrl}/api/upload_wms_excel`);


  const upload = ref<UploadInstance>()
  
  const handleExceed: UploadProps['onExceed'] = (files) => {
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
    .comparisons-control{
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      gap: 8px;
    }

  </style>