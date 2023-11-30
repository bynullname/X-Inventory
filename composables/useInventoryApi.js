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

  // 获取当前活跃的盘点计划
  const fetchActiveInventoryPlan = async () => {
    try {
      const response = await $fetch(deviceConfig.apiUrl + '/api/get_active_inventory_plan', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response && response.active_inventory_plan_id) {
        return { success: true, activeInventoryPlanId: response.active_inventory_plan_id };
      } else {
        return { success: false, message: '没有找到活跃的盘点计划' };
      }
    } catch (error) {
      return { success: false, message: '获取活跃盘点计划失败: ' + error };
    }
  };
  
  // 获取指定范围的库存项目
  const fetchInventoryItemsInRange = async (start, end, inventoryPlanId) => {
    try {
      const url = `${deviceConfig.apiUrl}/api/inventory_items/range?start=${start}&end=${end}&inventory_plan_id=${inventoryPlanId}`;
      const response = await $fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: '获取库存项目失败: ' + error };
    }
  };

  // 获取库存项目总数
  const fetchTotalInventoryItemsCount = async () => {
    try {
      const url = `${deviceConfig.apiUrl}/api/inventory_items/total_count`;
      const response = await $fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      return { success: true, count: response.total_count };
    } catch (error) {
      return { success: false, message: '获取库存项目总数失败: ' + error };
    }
  };

  // 获取特定盘点计划的库存项目总数
  const fetchTotalInventoryItemsCountByPlan = async (inventoryPlanId) => {
    try {
      const url = `${deviceConfig.apiUrl}/api/inventory_items/total_count_by_plan?inventory_plan_id=${inventoryPlanId}`;
      const response = await $fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      return { success: true, count: response.total_count };
    } catch (error) {
      return { success: false, message: '获取特定盘点计划的库存项目总数失败: ' + error };
    }
  };


  return {
    historyPlans,
    fetchLatestInventoryPlans,
    setActiveInventoryPlan,
    createInventoryPlan,
    continueWithSelectedPlan,
    fetchActiveInventoryPlan,
    fetchInventoryItemsInRange,
    fetchTotalInventoryItemsCount,
    fetchTotalInventoryItemsCountByPlan,
  };
}
