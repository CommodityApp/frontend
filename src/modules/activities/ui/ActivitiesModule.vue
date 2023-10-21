<script setup lang="ts">
import Header from "../components/Header.vue";
import Table from "../components/Table.vue";

import useModule from "../useModule";

const { isLoading, activitiesData, metaData, getActivities } = useModule()
</script>
<template>
    <Header />
    <Table 
        :metaData="metaData"
        :isLoading="isLoading"
        :activitiesData="activitiesData"
        :getActivities="getActivities"

    />
</template>