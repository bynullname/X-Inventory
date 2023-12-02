<template>
  <div class="video-monitor">
    <SingleCamera label="左侧相机" dir="left" />
    <SingleCamera label="右侧相机" dir="right"/>
  </div>
</template>


<script setup>

</script>

<style scoped>
.video-monitor {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  padding: 20px;
  background-color: #f5f5f5;
}

</style>
