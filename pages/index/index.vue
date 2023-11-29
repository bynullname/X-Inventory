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
            <el-form-item label="用&ensp;户&ensp;名">
              <el-input v-model="loginForm.username" class="login-input"></el-input>
            </el-form-item>
            <el-form-item label="密&emsp;&emsp;码">
              <el-input type="password" v-model="loginForm.password" class="login-input"></el-input>
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
              <el-input placeholder="输入盘点计划名称" class="full-width" v-model="inventoryPlanName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="full-width" @click="createInventoryPlan">创建计划</el-button>
            </el-form-item>
            <div class="divider">---------- or ----------</div>
            <el-form-item label="历史盘点计划">
            <el-select v-model="selectedPlanId" 
                       placeholder="请选择" 
                       @focus="fetchLatestInventoryPlans"
                       class="full-width-select">
              <el-option
                v-for="plan in historyPlans"
                :key="plan.value"
                :label="plan.label"
                :value="plan.value"                >
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
import { ElMessage } from 'element-plus'
import { useIsMobile } from '~/composables/useIsMobile';

const isMobile = useIsMobile();

const isLoggedIn = ref(false);
const loginForm = reactive({
  username: 'admin',
  password: '1234567890'
});

const inventoryPlanName = ref('');  // 盘点计划名称
const selectedPlanId = ref(null);
const historyPlans = ref([]); 

onMounted(() => {
  if (isMobile) {
    navigateTo('/inventory');
  }
  fetchLatestInventoryPlans();  // 在组件加载时调用此函数
});


//登陆
const handleLogin = async () => {
  try {
    const response = await $fetch(deviceConfig.apiUrl+'/api/login', {
      method: 'POST',
      credentials: 'include',  // 重要：允许携带跨域 cookie
      body: loginForm
    });

    if (response.success) {
      console.log('登录成功:', response.message);
      isLoggedIn.value = true; // 更新登录状态
    } else {
      console.log('登录失败:', response.message);
      // 处理登录失败的情况
    }
  } catch (error) {
    console.error('登录请求失败:', error);
    // 处理请求错误
  }
};
//创建盘点计划
const createInventoryPlan = async () => {
  if (!inventoryPlanName.value) {
    ElMessage({
        message: '请输入盘点计划名称',
        type: 'warning',
    })
    console.log('请输入盘点计划名称');
    return;
  }

  try {
    const response = await $fetch(deviceConfig.apiUrl+'/api/create_inventory_plan', {
      method: 'POST',
      credentials: 'include',  // 允许携带跨域 cookie
      body: { inventory_plan_id: inventoryPlanName.value }
    });

    if (response.success) {
      console.log(response.message);
      ElMessage({
        message: response.message,
        type: 'success',
      })
    } else {
      ElMessage.error('创建计划失败:' + response.message)
      console.log('创建计划失败:', response.message);
    }
  } catch (error) {
    ElMessage.error('创建计划失败:' + error)
    console.error('创建计划请求失败:', error);
  }
};
//获取历史盘点计划
const fetchLatestInventoryPlans = async () => {
  try {
    const response = await $fetch(deviceConfig.apiUrl + '/api/inventory_plans/latest', {
      method: 'GET',
      credentials: 'include',  // 允许携带跨域 cookie
    });

    if (response && response.length > 0) {
      historyPlans.value = response.map(plan => ({
        value: plan.inventory_plan_id,
        label: `${plan.inventory_plan_id} (创建于 ${plan.created_at})`
      }));
    }
  } catch (error) {
    console.error('获取历史盘点计划失败:', error);
  }
};



</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/background.webp'); /* 添加背景图 */
  background-size: cover; /* 确保背景图覆盖整个容器 */
  background-position: center; /* 背景图居中 */
  position: relative; /* 为蒙版设置相对定位 */
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7); /* 半透明黑色蒙版 */
  z-index: 1; /* 确保蒙版位于内容之下 */
}

.login-box {
  width: 400px;
  border-radius: 10px;
  position: relative; /* 使登录框高于蒙版 */
  padding: 20px 20px;
  z-index: 2;
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

.login-input {
  width: 100%; /* 设置为父元素宽度的100% */
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
