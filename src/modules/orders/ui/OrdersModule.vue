<script setup lang="ts">
import OrdersHeader from "../components/OrdersHeader.vue";
import OrdersTable from "../components/OrdersTable.vue";
import useModule from "../useModule";

const {} = useModule()
</script>
<template>
    <OrdersHeader />
    <OrdersTable />
</template>