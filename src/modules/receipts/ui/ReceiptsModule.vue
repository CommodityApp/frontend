<script setup lang="ts">
import ReceiptsHeader from "../components/ReceiptsHeader.vue";
import ReceiptsTable from "../components/ReceiptsTable.vue";
import useModule from "../useModule";

const { isLoading, deleteReceipt, editReceipt, cloneReceipt, receiptData } = useModule()
</script>
<template>
    <ReceiptsHeader />
    <ReceiptsTable 
        :isLoading="isLoading"
        :receiptData="receiptData"
        :deleteReceipt="deleteReceipt" 
        :editReceipt="editReceipt"
        :cloneReceipt="cloneReceipt"
    />
</template>