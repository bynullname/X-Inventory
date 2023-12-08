 <template>
    <div class="roi-control">
      <div class="roi-grid">
        <div>
          <el-text class="label-text" type="primary">Top</el-text>
          <el-input-number v-model="numTop" :precision="2" :step="0.1" :max="10" />
        </div>
        <div>
          <el-input-number v-model="numBottom" :precision="2" :step="0.1" :max="10" />
          <el-text class="label-text" type="primary">Bottom</el-text>

        </div>
        <div>
          <el-text class="label-text" type="primary">Left</el-text>
          <el-input-number v-model="numLeft" :precision="2" :step="0.1" :max="10" />
        </div>
        <div>
          <el-input-number v-model="numRight" :precision="2" :step="0.1" :max="10" />
          <el-text class="label-text" type="primary">&ensp;Right&ensp;</el-text>
        </div>
      </div>
      <div class="roi-save">
        <el-button type="primary" :icon="Edit">保存 ROI</el-button>
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
    const numTop = ref(0)
    const numBottom = ref(0)
    const numLeft = ref(0)
    const numRight = ref(0)
  </script>

  <style scoped> 
    .roi-control{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 8px;
    }


    .roi-control .roi-grid {
        display: grid;
        grid-template-columns: repeat(2, auto);
        gap: 10px; /* 可以根据需要调整间距 */
        align-items: center;
        justify-content: center; /* 使得整个网格在容器中居中 */
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

  </style>
  