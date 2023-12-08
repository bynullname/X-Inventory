 <template>
    <div class="roi-control">
      <div class="roi-grid">
        <div>
          <el-text class="label-text" type="primary">Top</el-text>
          <el-input-number v-model="topScaleLinePercent" :precision="2" :step="0.02" :max="0.8" :min="0.1" />
        </div>
        <div>
          <el-input-number v-model="bottomValue" :precision="2" :step="0.02" :max="1" :min="0.6" />
          <el-text class="label-text" type="primary">Bottom</el-text>

        </div>
        <div>
          <el-text class="label-text" type="primary">Left</el-text>
          <el-input-number v-model="leftScaleLinePercent" :precision="2" :step="0.02" :max="0.49" :min="0.01" />
        </div>
        <div>
          <el-input-number v-model="rightScaleLinePercent" :precision="2" :step="0.02" :max="0.99" :min="0.51" />
          <el-text class="label-text" type="primary">&ensp;Right&ensp;</el-text>
        </div>
      </div>
      <div class="roi-save">
        <el-button type="primary" :icon="Edit" @click="handleSave">保存 ROI</el-button>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref,onMounted } from 'vue'
    import { Edit} from '@element-plus/icons-vue'
    import { useInventoryApi } from '~/composables/useInventoryApi'
    import { deviceConfig } from '~/config/index'; // 引入配置文件
    const { setCameraRoi, fetchCameraRoi } = useInventoryApi();

    const topScaleLinePercent = useState('topScaleLinePercent',()=> 0.3);
    const leftScaleLinePercent = useState('leftScaleLinePercent',()=> 0.1);
    const rightScaleLinePercent = useState('rightScaleLinePercent',()=> 0.9);
    const bottomValue = ref(deviceConfig.camera_roi_bottom || 0.9); // 如果 deviceConfig 中没有相应值，则默认为 0.9

    const handleSave = async () => {
        // 构建要保存的 ROI 数据
        const roiData = {
            left: {
            top: topScaleLinePercent.value,
            bottom: bottomValue.value, // 假设 bottom 是基于 top 的补数
            left: leftScaleLinePercent.value,
            right: rightScaleLinePercent.value
            },
            right: {
            // 这里假设右侧相机的 ROI 设置与左侧相同，根据实际需要调整
            top: topScaleLinePercent.value,
            bottom: bottomValue.value,
            left: leftScaleLinePercent.value,
            right: rightScaleLinePercent.value
            }
        };

        // 调用设置 ROI 的 API
        const response = await setCameraRoi(roiData);
        if (response.success) {
            console.log('ROI 保存成功');
            ElMessage({
                    message: 'ROI 保存成功',
                    type: 'success',
            })
        } else {
            console.error('保存ROI失败: ' + response.message);
            ElMessage.error('保存ROI失败: ' + response.message);

        }
    };

    onMounted(async () => {
        const response = await fetchCameraRoi();
        if (response.success) {
            const { left, right } = response.cameraRoi;
            topScaleLinePercent.value = left.top;
            leftScaleLinePercent.value = left.left;
            rightScaleLinePercent.value = left.right;
            // 如果右侧相机有不同的设置，您也可以相应地更新它们
        } else {
            console.error('加载 ROI 设置失败: ' + response.message);
        }
    });
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
  