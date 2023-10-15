<script setup lang="ts">
import ClientsAddForm from "../components/ClientsAddForm.vue";
import useModule from "../useModule";

const { isLoading,
        saveClient,
        updateClient,
        getCountries,
        countriesData,
        clientsData, } = useModule();
</script>
<template>
  <div class="flex flex-col my-10">
    <ClientsAddForm
      :isLoading="isLoading"
      :saveClient="saveClient"
      :updateClient="updateClient"
      :getCountries="getCountries"
      :countriesData="countriesData"
      :clientsData="clientsData"
    />
  </div>
</template>
