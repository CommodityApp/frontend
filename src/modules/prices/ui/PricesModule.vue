<script setup lang="ts">
import PricesHeader from "../components/PricesHeader.vue";
import PricesTable from "../components/PricesTable.vue";
import useModule from "../useModule";

const {
  priceData,
  isLoading,
  metaData,
  getPrices,
  deletePrice,
  editPrice,
  clonePrice,
} = useModule();
</script>
<template>
  <PricesHeader />
  <PricesTable
    :isLoading="isLoading"
    :priceData="priceData"
    :metaData="metaData"
    :getPrices="getPrices"
    :deletePrice="deletePrice"
    :editPrice="editPrice"
    :clonePrice="clonePrice"
  />
</template>
