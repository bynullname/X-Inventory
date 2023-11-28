<template>
    <div class="center-container">
        <el-switch
            v-model="inventoryState"
            class="mb-2 switch-style"
            size="large"
            active-text="盘点"
            inactive-text="停歇"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const inventoryState = ref(false)
</script>

<style>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ebebeb; /* 略深的灰色背景 */
    padding: 20px; /* 添加一些内边距 */
    border-radius: 10px; /* 轻微的圆角边框 */
  }

  .switch-style {
    margin-right: 20px; /* 两个组件之间的间距 */
  }
</style>