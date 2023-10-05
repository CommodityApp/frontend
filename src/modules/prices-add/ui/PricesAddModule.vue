<script setup lang="ts">
import PricesAddForm from '../components/PricesAddForm.vue';
import useModule from '../useModule';

const { singlePrice, rawsData, isLoading, queryType, onSavePrice } = useModule()
</script>
<template>
    <div class="flex flex-col my-10">
        <PricesAddForm
            :isLoading="isLoading"
            :rawsData="rawsData"
            :singlePrice="singlePrice"
            :queryType="queryType"
            @onSavePrice="onSavePrice"
        />
    </div>
</template>