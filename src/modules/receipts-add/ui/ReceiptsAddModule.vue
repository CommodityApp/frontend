<script setup lang="ts">
import ReceiptsAddForm from '../components/ReceiptsAddForm.vue';
import useModule from '../useModule';

const { isLoading, rawsData, animalTypes, singleReceipt, queryType, onSaveReceipt } = useModule()
</script>
<template>
    <div class="flex flex-col my-10">
        <ReceiptsAddForm
            :isLoading="isLoading" 
            :rawsData="rawsData"
            :singleReceipt="singleReceipt"
            :queryType="queryType"
            :animalTypes="animalTypes"
            @onSaveReceipt="onSaveReceipt"
        />
    </div>
</template>