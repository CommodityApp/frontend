<script setup lang="ts">
import ClientsHeader from "../components/ClientsHeader.vue";
import ClientsTable from "../components/ClientsTable.vue";

import useModule from "../useModule";

const {
  isLoading,
  producersData,
  metaData,
  getProducers,
  deleteProducer,
  editProducer,
} = useModule();
</script>
<template>
  <ClientsHeader />
  <ClientsTable
    :isLoading="isLoading"
    :producersData="producersData"
    :metaData="metaData"
    :getProducers="getProducers"
    :deleteProducer="deleteProducer"
    :editProducer="editProducer"
  />
</template>
