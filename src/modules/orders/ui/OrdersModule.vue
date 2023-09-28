<script setup lang="ts">
import OrdersHeader from "../components/OrdersHeader.vue";
import OrdersTable from "../components/OrdersTable.vue";
import useModule from "../useModule";

const { orders, isLoading } = useModule()
</script>
<template>
    <OrdersHeader />
    <OrdersTable :orders="orders" :isLoading="isLoading" />
</template>