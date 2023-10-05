<script setup lang="ts">
import PricesHeader from "../components/PricesHeader.vue";
import PricesTable from "../components/PricesTable.vue";
import useModule from "../useModule";

const { priceData, isLoading, deletePrice, editPrice, clonePrice } = useModule()
</script>
<template>
    <PricesHeader />
    <PricesTable
        :isLoading="isLoading"
        :priceData="priceData" 
        :deletePrice="deletePrice"
        :editPrice="editPrice"
        :clonePrice="clonePrice"
    />
    
</template>