<script setup lang="ts">
import OrdersHeader from "../components/OrdersHeader.vue";
import OrdersTable from "../components/OrdersTable.vue";
import useModule from "../useModule";

const { orders, isLoading, metaData, getOrders, addNewOrder } = useModule();
</script>
<template>
  <OrdersHeader :addNewOrder="addNewOrder" />
  <OrdersTable
    :orders="orders"
    :metaData="metaData"
    :isLoading="isLoading"
    :getOrders="getOrders"
  />
</template>
