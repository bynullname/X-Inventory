<template>
  <div class="center-container">
    <div class="sub-container">
      <InventorySwitch />
    </div>
    <div class="sub-container">
      <SetRoi />
    </div>
    <div class="sub-container">
      <CompairData />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped>
  .center-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    gap: 100px;
    /* background-color: #c3e2e9;  */
    background-color: transparent;
    margin-top: 10px;
  }

  .sub-container{
    height: 80%;
    width: 400px;
    min-width: 400px;
    background-color: rgba(192, 209, 224, 0.839);
    border-radius: 10px;
    /* box-shadow: 5px 15px 50px rgba(83, 95, 100, 0.6);  */
    padding: 10px 5px;
    transition: box-shadow 0.3s;
  }

  .sub-container:hover{
    box-shadow: var(--el-box-shadow-dark);
  }
</style>