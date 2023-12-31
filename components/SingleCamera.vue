<template>
  <div class="image-container">
    <span class="camera-label">{{ label }}</span>
    <div class="draggable-line vertical top-scale-line" 
       :style="{ top: topScaleLinePercent * 100 + '%' , height : lineWidth + 'px'}"
       @mousedown="startDragVertical"></div>
    <div class="draggable-line horizontal left-scale-line" 
       :style="{ left: leftScaleLinePercent * 100 + '%', width: lineWidth + 'px' }" 
       @mousedown="startDragHorizontal"></div>
    <div class="draggable-line horizontal right-scale-line" 
        :style="{ right: (1 - rightScaleLinePercent) * 100 + '%', width: lineWidth + 'px' }" 
        @mousedown="startDragHorizontal"></div>
    <div class="vertical-dashed-line"></div>
    <div class="horizontal-dashed-line" :style="{ top: dashedLineTop }"></div>
    <div class="image-overlay top-boundary" :style="{ height: topScaleLinePercent * 100 + '%' }"></div>
    <div class="image-overlay left-boundary" :style="{ width: leftScaleLinePercent * 100 + '%' }"></div>
    <div class="image-overlay right-boundary" :style="{ width: (1 - rightScaleLinePercent) * 100 + '%' }"></div>
    <img :src="imageUrl" @error="setDefaultImage" :alt="label" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { deviceConfig } from '~/config/index';

const lineWidth = ref(4); // 刻度线宽
const cameraRoiBottom = ref(deviceConfig.camera_roi_bottom);
const dashedLineTop = computed(() => `${cameraRoiBottom.value * 100}%`);
const inventoryState = useState('inventoryState')


const props = defineProps({
  label: String,
  dir: String,
  defaultImageUrl: {
    type: String,
    default: '/NoCamera.jpg',
  },
  updateInterval: {
    type: Number,
    default: 100,
  },
});

const imageUrl = ref(props.defaultImageUrl);
const topScaleLinePercent = useState('topScaleLinePercent');
const leftScaleLinePercent = useState('leftScaleLinePercent');
const rightScaleLinePercent = useState('rightScaleLinePercent');

const setDefaultImage = (event) => {
  event.target.src = props.defaultImageUrl;
};

const updateImage = () => {
  if(inventoryState.value) imageUrl.value = `${deviceConfig.apiUrl}/api/image_${props.dir}?timestamp=${new Date().getTime()}`;
};

// 垂直拖动相关的逻辑
let startY, startTop;
let draggableLineVertical;

const startDragVertical = (e) => {
  startY = e.clientY;
  startTop = e.target.offsetTop;
  draggableLineVertical = e.target;
  document.addEventListener('mousemove', onDragVertical);
  document.addEventListener('mouseup', stopDragVertical);
};

const onDragVertical = (e) => {
  const newTop = startTop + e.clientY - startY;
  const containerHeight = draggableLineVertical.parentElement.offsetHeight;
  const oneThirdContainerHeight = containerHeight * 2 / 3;
  const lineHalfHeight = lineWidth.value / 2;

  let adjustedTop = newTop;
  if (newTop < 0) {
    adjustedTop = 0;
  } else if (newTop > oneThirdContainerHeight - lineHalfHeight) {
    adjustedTop = oneThirdContainerHeight - lineHalfHeight;
  }
  topScaleLinePercent.value = parseFloat(((adjustedTop + lineHalfHeight) / containerHeight).toFixed(2));
};


const stopDragVertical = () => {
  document.removeEventListener('mousemove', onDragVertical);
  document.removeEventListener('mouseup', stopDragVertical);
  draggableLineVertical = null;
};

// 水平拖动相关的逻辑
let startX, startLeft;
let draggableLineHorizontal;

const startDragHorizontal = (e) => {
  startX = e.clientX;
  startLeft = e.target.offsetLeft;
  draggableLineHorizontal = e.target;
  document.addEventListener('mousemove', onDragHorizontal);
  document.addEventListener('mouseup', stopDragHorizontal);
};

const onDragHorizontal = (e) => {
  const newLeft = startLeft + e.clientX - startX;
  const containerWidth = draggableLineHorizontal.parentElement.offsetWidth;
  const halfLineWidth = lineWidth.value / 2;

  // 处理左侧拖动线
  if (draggableLineHorizontal.classList.contains('left-scale-line')) {
    leftScaleLinePercent.value = parseFloat(((newLeft + halfLineWidth) / containerWidth).toFixed(2));
  }

  // 处理右侧拖动线
  else if (draggableLineHorizontal.classList.contains('right-scale-line')) {
    rightScaleLinePercent.value = parseFloat(((newLeft + halfLineWidth) / containerWidth).toFixed(2));
  }
};


const stopDragHorizontal = () => {
  document.removeEventListener('mousemove', onDragHorizontal);
  document.removeEventListener('mouseup', stopDragHorizontal);
  draggableLineHorizontal = null;
};

onMounted(() => {
  setInterval(updateImage, props.updateInterval);
});
</script>


<style scoped>
.image-container {

  box-shadow: 30px 30px 50px rgba(33, 35, 36, 0.6); /* 淡蓝色阴影 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 50px;
}

.image-container img {
  width: 100%;
  height: auto;
  user-select: none; /* 禁止图像被选中 */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

.draggable-line.vertical {
  position: absolute;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: rgba(255, 0, 0, 0.5); /* 不同颜色以区分 */
  cursor: ns-resize;
  top: 50%; /* 初始位置在容器中间 */
}

/* 水平拖动线的样式 */
.draggable-line.horizontal {
  position: absolute;
  top: 0;
  height: 100%;
  width: 10px;
  background-color: rgba(255, 0, 0, 0.5); /* 不同颜色以区分 */
  cursor: ew-resize;
}

.draggable-line.horizontal.left {
  left: 25%; /* 初始位置在容器左侧 */
}

.draggable-line.horizontal.right {
  right: 25%; /* 初始位置在容器右侧 */
}

.camera-label {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #007bff;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  font-size: 0.9em;
  line-height: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.vertical-dashed-line {
    position: absolute;
    left: 50%;
    height: 100%;
    border-left: 2px dashed rgb(255, 0, 0); /* 黑色虚线 */
    z-index: 100;
  }

  .horizontal-dashed-line {
    position: absolute;
    top: 90%;
    width: 100%;
    border-top: 2px dashed rgb(255, 0, 0); /* 黑色虚线 */
    z-index: 100;
  }

  .image-overlay.top-boundary {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(42, 163, 254, 0.5);
  }

  .image-overlay.left-boundary {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(42, 163, 254, 0.5);
  }

  .image-overlay.right-boundary {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-color: rgba(42, 163, 254, 0.5);
  }

/* 媒体查询，针对手机端或小屏幕设备 */
@media (max-width: 750px) {
  .video-monitor {
    height: 100%;
    flex-direction: column;
    gap: 10px;
  }

  .image-container {
    width: 90%;
    height: 50%;
    margin-bottom: 20px;
  }

  .camera-label {
    font-size: 0.6em;
  }
}
</style>
