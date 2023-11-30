<template>
  <div class="all-container">
    <div class="tableTools" v-if="!isMobile">
      <el-select v-model="selectedField" placeholder="选择字段" class="select-field">
      <el-option label="库位号" value="location_number"></el-option>
      <el-option label="SN号" value="sn"></el-option>
      <el-option label="TagID" value="tag_id"></el-option>
    </el-select>
    <el-input v-model="searchQuery" placeholder="请输入搜索内容" class="search-input"></el-input>
    <el-button :icon="ElIconSearch" type="primary" class="button-style" @click="handleSearch">搜索</el-button>
    <el-button :icon="ElIconDownload" type="success" class="button-style">导出表格</el-button>
  </div>
    <el-table
      ref="tableRef"
      :height="tableHeight"
      :data="currentData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      filter-multiple
      @filter-change="handleFilterChange"
    >
      <el-table-column prop="location_number" label="库位号"/>
      <el-table-column prop="sn" label="SN号" />
      <el-table-column v-if="isDesktop" prop="material_number" label="物料号" />
      <el-table-column v-if="isDesktop" prop="quantity" label="数量" />
      <el-table-column v-if="isDesktop" prop="factory" label="工厂" />
      <el-table-column prop="tag_id" label="TagID" />
      <el-table-column  prop="inventory_result" 
                        label="盘点结果" 
                        :filters="[{ text: '正常', value: '正常' }, { text: '异常', value: '异常' }]"
      />
      <el-table-column v-if="isDesktop" prop="remarks" 
                                        label="备注" 
                                        :filters="[{ text: '有货无码', value: '有货无码' }, { text: '无货无码', value: '无货无码' }]"/>
      <el-table-column v-if="isDesktop" prop="created_at" label="创建时间" />
      <el-table-column v-if="isDesktop" prop="updated_at" label="更新时间" />
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total=totalItemsCount
      :small="true"
      >
    </el-pagination>
  </div>
</template>


<script lang="ts" setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import type { TableColumnCtx, TableInstance } from 'element-plus'
  import { useIsMobile } from '~/composables/useIsMobile';
  import { useInventoryApi } from '~/composables/useInventoryApi';

  const 
  { 
    historyPlans, 
    fetchLatestInventoryPlans,
    setActiveInventoryPlan,
    createInventoryPlan,
    continueWithSelectedPlan,
    fetchActiveInventoryPlan,
    fetchInventoryItemsInRange,
    fetchTotalInventoryItemsCount,
    fetchTotalInventoryItemsCountByPlan
  } = useInventoryApi();

  // 定义库存项的接口
  interface InventoryItem {
    location_number: string;
    sn: string;
    material_number: string;
    quantity: number;
    factory: string;
    tag_id: string;
    inventory_result: string;
    remarks: string;
    created_at: string;
    updated_at: string;
  }

  const isMobile = useIsMobile();
  const tableRef = ref<TableInstance | null>(null);
  const tableHeight = ref<string | null>(null);
  const selectedField = ref<string>('location_number');
  const searchQuery = ref<string>('');
  const currentData = ref<InventoryItem[]>([]);
  const totalItemsCount = ref<number>(0);
  const currentPage = ref<number>(1);
  const pageSize = ref<number>(100);
  const isDesktop = ref<boolean>(window.innerWidth > 768);

  // 更新表格高度
  const updateTableHeight = () => {
    const table = tableRef.value?.$el;
    if (!table) return;
    const top = table.getBoundingClientRect().top;
    tableHeight.value = top <= 70 ? `${window.innerHeight - 70}px` : null;
  };

  // 处理表格行的类名
  const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
    return rowIndex === 0 ? 'error-row' : rowIndex === 1 ? 'success-row' : '';
  };

  // 更新窗口宽度
  const updateWindowWidth = () => {
    isDesktop.value = window.innerWidth > 768;
  };

  const handleFilterChange = (filters) =>{

  };

  // 获取指定页的数据
  const fetchPageData = async () => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    const data = await fetchInventoryItemsInRange(start, end, '2023年1月盘点'); // 替换为实际的库存计划ID
    if (data.success) {
      currentData.value = data.data as InventoryItem[]; // 类型断言
    }
  };

  // 在组件挂载时获取数据
  onMounted(async () => {
    window.addEventListener('resize', updateWindowWidth);
    window.addEventListener('scroll', updateTableHeight);
    await fetchPageData();
    const totalCountData = await fetchTotalInventoryItemsCountByPlan('2023年1月盘点');
    if (totalCountData.success) {
      totalItemsCount.value = totalCountData.count;
      console.log(totalCountData)
    }
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth);
    window.removeEventListener('scroll', updateTableHeight);
  });

  // 处理当前页码更改
  const handleCurrentChange = async (newPage: number) => {
    currentPage.value = newPage;
    await fetchPageData();
  };

  // 搜索功能（需要根据实际情况调整）
  const handleSearch = async () => {
    // 这里可以添加搜索逻辑，可能需要调整后端API或添加额外的API调用
  };

  const handleSizeChange = async () => {
    // 这里可以添加搜索逻辑，可能需要调整后端API或添加额外的API调用
  };
</script>

<style>
  .all-container {
    background-color: white; /* 略深的灰色背景 */
  }
  .tableTools {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  .select-field {
    margin-right: 10px;
    width: 150px; /* 或根据布局需要调整宽度 */
  }

  .search-input {
    margin-right: 10px;
    width: 200px; /* 或根据布局需要调整宽度 */
  }

  .el-table .error-row {
    --el-table-tr-bg-color: #f53c3c;
  }
  .el-table .success-row {
    --el-table-tr-bg-color: #d5f3c6;
  }
  .button-style {
    margin: 10px 0;
    background-color: #409EFF; /* 主题蓝色 */
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .button-style .el-icon {
    font-size: 1.2em;
  }

  .button-style span {
    font-size: 1em;
    margin-left: 8px;
  }
  .el-pagination {
      z-index: 1000; /* 或更高的值，以确保它在最上层 */
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%; /* 根据需要调整 */
      background-color: white; /* 或其他背景颜色 */
      padding: 10px 0;
      box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    }

  @media screen and (max-width: 600px) {
    .el-pagination {
      z-index: 1000; /* 或更高的值，以确保它在最上层 */
      position: fixed;
      bottom: 0;
      left: 50%;
      height: 20px;
      width: 100vh;
      transform: translateX(0);
      background-color: rgb(255, 255, 255); /* 或其他背景颜色 */
      padding: 10px 0;
      box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    }
  }
</style>

