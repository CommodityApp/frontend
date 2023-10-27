<script setup lang="ts">
import ClientsHeader from "../components/ClientsHeader.vue";
import ClientsTable from "../components/ClientsTable.vue";

import useModule from "../useModule";

const {
  isLoading,
  clientsData,
  metaData,
  getClients,
  deleteClient,
  editClient,
} = useModule();
</script>
<template>
  <ClientsHeader />
  <ClientsTable
    :isLoading="isLoading"
    :clientsData="clientsData"
    :metaData="metaData"
    :getClients="getClients"
    :deleteClient="deleteClient"
    :editClient="editClient"
  />
</template>
