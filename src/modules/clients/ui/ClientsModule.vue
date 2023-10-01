<script setup lang="ts">
import ClientsHeader from "../components/ClientsHeader.vue";
import ClientsTable from "../components/ClientsTable.vue";

import useModule from "../useModule";

const { isLoading, clientsData } = useModule()
</script>
<template>
    <ClientsHeader />
    <ClientsTable 
        :isLoading="isLoading"
        :clientsData="clientsData" 
    />
</template>