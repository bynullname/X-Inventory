<template>
    <el-tooltip content="登出" placement="top">
      <el-button v-if="isLoggedIn" 
                 type="danger" 
                 size="large"
                 class="logout-button" 
                 @click="handleLogout"
                 :icon="Remove"
                 circle>               
      </el-button>
    </el-tooltip>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { deviceConfig } from '~/config/index';
  import { Remove } from '@element-plus/icons-vue'

  // 假设 `isLoggedIn` 是一个响应式状态，用于判断用户是否登录
  const isLoggedIn = useState('isLoggedIn')
  
  // 登出 API URL
  const logoutApiUrl = deviceConfig.apiUrl + '/api/logout';
  
  // 处理登出逻辑
  const handleLogout = async () => {
    try {
      const response = await $fetch(logoutApiUrl, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.success) {
        console.log('登出成功:', response.message);
        ElMessage({
            message: '已登出',
            type: 'success', // 显示成功消息
            duration: 3000 // 消息显示时间，单位毫秒
        });
        isLoggedIn.value = false;
        navigateTo('/');
      } else {
        ElMessage({
          message: '登出失败',
          type: 'error', // 显示错误消息
          duration: 3000 // 消息显示时间，单位毫秒
        });
        console.log('登出失败:', response.message);
      }
    } catch (error) {
      console.error('登出请求失败:', error);
      ElMessage({
          message: '登出失败 : ' +error,
          type: 'error', // 显示错误消息
          duration: 3000 // 消息显示时间，单位毫秒
        });
    }
  };
  </script>
  
  <style scoped>
  .logout-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
  }
  </style>
  