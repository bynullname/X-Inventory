import { ref } from 'vue';
import { deviceConfig } from '~/config/index';

export function useInventoryApi() {
  const historyPlans = ref([]);

  // 获取历史盘点计划
  const fetchLatestInventoryPlans = async () => {
    try {
      const response = await $fetch(deviceConfig.apiUrl + '/api/inventory_plans/latest', {
        method: 'GET',
        credentials: 'include',
      });

      if (response && response.length > 0) {
        historyPlans.value = response.map(plan => ({
          value: plan.inventory_plan_id,
          label: `${plan.inventory_plan_id} (创建于 ${plan.created_at})`
        }));
        return { success: true, data: historyPlans.value };
      } else {
        return { success: false, message: '未找到历史盘点计划' };
      }
    } catch (error) {
      return { success: false, message: '获取历史盘点计划失败: ' + error };
    }
  };


  // 设置活跃计划
  const setActiveInventoryPlan = async (planId) => {
    try {
      const response = await $fetch(deviceConfig.apiUrl + '/api/set_active_inventory_plan', {
        method: 'POST',
        credentials: 'include',
        body: { inventory_plan_id: planId }
      });

      return response;
    } catch (error) {
      return { success: false, message: '活跃计划设置请求失败: ' + error };
    }
  };

  // 创建盘点计划并设置为活跃计划
  const createInventoryPlan = async (inventoryPlanName) => {
    if (!inventoryPlanName) {
      return { success: false, message: '请输入盘点计划名称' };
    }

    try {
      const createResponse = await $fetch(deviceConfig.apiUrl+'/api/create_inventory_plan', {
        method: 'POST',
        credentials: 'include',
        body: { inventory_plan_id: inventoryPlanName }
      });

      if (createResponse.success) {
        // 盘点计划创建成功后，立即设置为活跃计划
        await setActiveInventoryPlan(inventoryPlanName);
      }
      return createResponse;
    } catch (error) {
      return { success: false, message: '创建计划请求失败: ' + error };
    }
  };

  // 继续盘点选择的计划
  const continueWithSelectedPlan = async (selectedPlanId) => {
    if (!selectedPlanId) {
      return { success: false, message: '请选择一个盘点计划' };
    }

    try {
      const response = await setActiveInventoryPlan(selectedPlanId);
      return response;
    } catch (error) {
      return { success: false, message: '继续盘点计划请求失败: ' + error };
    }
  };


  return {
    historyPlans,
    fetchLatestInventoryPlans,
    setActiveInventoryPlan,
    createInventoryPlan,
    continueWithSelectedPlan
  };
}