<template>
  <div class="login-container">
    <el-card class="login-box">
      <transition name="fade" mode="out-in">
        <div v-if="!isLoggedIn" key="login-form">
          <!-- 登录前显示的内容 -->
          <div class="logo">
            <img src="/logo.png" alt="Logo">
          </div>
          <el-form>
            <el-form-item label="用户名">
              <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <div class="button-container">
              <el-button type="primary" @click="handleLogin">登录</el-button>
            </div>
          </el-form>
        </div>

        <div v-else key="after-login-form">
          <!-- 登录后显示的内容 -->
          <el-form>
            <el-form-item label="盘点计划名称">
              <el-input placeholder="输入盘点计划名称" class="full-width"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="full-width">创建计划</el-button>
            </el-form-item>
            <div class="divider">---------- or ----------</div>
            <el-form-item label="历史盘点计划">
              <el-select placeholder="请选择" class="full-width-select">
                <el-option
                  v-for="item in historyPlans"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="success" class="full-width">继续盘点</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref } from 'vue';
import { deviceConfig } from '~/config/index';

const isMobile = ref(false);
const isLoggedIn = ref(false);
const loginForm = reactive({
  username: '',
  password: ''
});
const historyPlans = ref([{ value: 'plan1', label: '计划 1' }, { value: 'plan2', label: '计划 2' }]); // 示例数据

const handleLogin = () => {
  console.log('登录信息', loginForm);
  isLoggedIn.value = true; // 模拟登录成功
};
onMounted(() => {
  if (window.navigator.userAgent.match(/mobile/i)) {
    isMobile.value = true;
    navigateTo('/inventory');
  }
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  width: 400px;
  border-radius: 10px;
}

.content {
  padding: 20px;
}

.logo {
  text-align: center;
  margin-bottom: 20px;
}

.logo img {
  width: 200px;
}

.button-container, .el-form-item, .full-width-select {
  text-align: center;
  width: 100%; /* 确保宽度与容器相同 */
}

.full-width, .full-width-select {
  width: 100%;
}

.divider {
  text-align: center;
  margin: 20px 0;
  color: #ccc;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
