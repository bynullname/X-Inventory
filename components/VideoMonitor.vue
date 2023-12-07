<template>
  <div class="video-monitor">
    <SingleCamera class="camera" label="左侧相机" dir="left" />
    <!-- <div class="camera-control">
        <el-switch
        class="wide-switch"
        v-model="syncIndependent"
        active-text="同步"
        inactive-text="独立">
      </el-switch>
      <el-button type="success" @click="handleSave">保存 ROI</el-button>
    </div> -->
    <SingleCamera class="camera" label="右侧相机" dir="right"/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { deviceConfig } from '~/config/index';

import { useInventoryApi } from '~/composables/useInventoryApi'; // 确保这里的路径正确
const { setCameraRoi, fetchCameraRoi } = useInventoryApi();

const syncIndependent = ref(true)
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
.video-monitor {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 20px;
  background-color: transparent;
}

.camera{
  width: 45%;
  max-width: 1080px;
  height: auto;
}

.camera-control {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 设置按钮之间的间距 */
}

</style>
