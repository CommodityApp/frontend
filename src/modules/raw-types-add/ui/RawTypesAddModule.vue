<script setup lang="ts">
import ClientsAddForm from "../components/ClientsAddForm.vue";
import useModule from "../useModule";

const { isLoading,
    saveRawTypes,
    updateRawType,
    rawTypesData } = useModule();
</script>
<template>
  <div class="flex flex-col my-10">
    <ClientsAddForm
      :isLoading="isLoading"
      :saveRawTypes="saveRawTypes"
      :updateRawType="updateRawType"
      :rawTypesData="rawTypesData"
    />
  </div>
</template>
