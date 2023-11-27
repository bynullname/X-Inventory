<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="location_number" label="库位号" width="180" />
    <el-table-column prop="sn" label="SN号" />
    <el-table-column v-if="isDesktop" prop="material_number" label="物料号" />
    <el-table-column v-if="isDesktop" prop="quantity" label="数量" />
    <el-table-column v-if="isDesktop" prop="factory" label="工厂" />
    <el-table-column prop="tag_id" label="TagID" />
    <el-table-column prop="inventory_result" label="盘点结果" />
    <el-table-column v-if="isDesktop" prop="remarks" label="备注" />
    <el-table-column v-if="isDesktop" prop="created_at" label="创建时间" />
    <el-table-column v-if="isDesktop" prop="updated_at" label="更新时间" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

interface Data {
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

const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  if (rowIndex === 0) {
    return 'error-row';
  } else if (rowIndex === 1) {
    return 'success-row';
  }
  return '';
};

const isDesktop = ref(window.innerWidth > 768);

const updateWindowWidth = () => {
  isDesktop.value = window.innerWidth > 768;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

// 这里是模拟数据
const tableData: Data[] = [
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
  {
    location_number: 'X3-1-2-3',
    sn: '96233',
    material_number: '58-7858',
    quantity: 63,
    factory: 'Kelly, Blackburn and Donaldson',
    tag_id: '615XrP',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-07-10 03:00:27',
    updated_at: '2023-09-14 05:40:58'
  },
  {
    location_number: 'X3-1-2-4',
    sn: '96973',
    material_number: '64-6422',
    quantity: 34,
    factory: 'Hunter PLC',
    tag_id: '817ejm',
    inventory_result: '异常',
    remarks: '',
    created_at: '2023-06-12 17:41:40',
    updated_at: '2023-03-16 14:59:48'
  },
];
</script>

<style>
.el-table .error-row {
  --el-table-tr-bg-color: #f53c3c;
}
.el-table .success-row {
  --el-table-tr-bg-color: #d5f3c6;
}
</style>
