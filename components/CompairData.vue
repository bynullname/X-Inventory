<template>
  <div class="comparisons-control">

      <div>
        <el-button type="primary" :icon="Switch">比对结果</el-button>
        <el-button type="primary" :icon="Download" @click="">下载比对结果</el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  // import { Delete, Edit, Search,Download, Share, Upload, Switch} from '@element-plus/icons-vue'
  // import { genFileId } from 'element-plus'
  // import {  UploadProps, UploadRawFile } from 'element-plus'
  // import { useInventoryApi } from '~/composables/useInventoryApi'
  // import { deviceConfig } from '~/config/index'; // 引入配置文件
  // const uploadAction = ref(`${deviceConfig.apiUrl}/api/upload_wms_excel`);


  // const upload = ref<UploadInstance>()
  
  // const handleExceed: UploadProps['onExceed'] = (files) => {
  //   upload.value!.clearFiles()
  //   const file = files[0] as UploadRawFile
  //   file.uid = genFileId()
  //   upload.value!.handleStart(file)
  // }
  
  // const submitUpload = () => {
  //   upload.value!.submit()
  // }
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