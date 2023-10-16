<script setup lang="ts">
import Header from "../components/Header.vue";
import Table from "../components/Table.vue";

import useModule from "../useModule";

const { isLoading, activitiesData } = useModule()
</script>
<template>
    <Header />
    <Table 
        :isLoading="isLoading"
        :activitiesData="activitiesData"
    />
</template>