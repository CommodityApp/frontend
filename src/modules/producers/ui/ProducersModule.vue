<script setup lang="ts">
import ClientsHeader from "../components/ClientsHeader.vue";
import ClientsTable from "../components/ClientsTable.vue";

import useModule from "../useModule";

const { isLoading,
        producersData,
        deleteProducer,
        editProducer } = useModule()
</script>
<template>
    <ClientsHeader />
    <ClientsTable 
        :isLoading="isLoading"
        :producersData="producersData"
        :deleteProducer="deleteProducer" 
        :editProducer="editProducer"
    />
</template>