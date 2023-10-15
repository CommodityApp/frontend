<script setup lang="ts">
import ClientsAddForm from "../components/ClientsAddForm.vue";
import useModule from "../useModule";

const { isLoading,
    saveProducer,
    updateProducer,
    getCountries,
    countriesData,
    producersData } = useModule();
</script>
<template>
  <div class="flex flex-col my-10">
    <ClientsAddForm
      :isLoading="isLoading"
      :saveProducer="saveProducer"
      :updateProducer="updateProducer"
      :getCountries="getCountries"
      :countriesData="countriesData"
      :producersData="producersData"
    />
  </div>
</template>
