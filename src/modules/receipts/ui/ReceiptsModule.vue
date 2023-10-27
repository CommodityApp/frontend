<script setup lang="ts">
import ReceiptsHeader from "../components/ReceiptsHeader.vue";
import ReceiptsTable from "../components/ReceiptsTable.vue";
import useModule from "../useModule";

const {
  isLoading,
  metaData,
  getReceipts,
  deleteReceipt,
  editReceipt,
  cloneReceipt,
  receiptData,
} = useModule();
</script>
<template>
  <ReceiptsHeader />
  <ReceiptsTable
    :isLoading="isLoading"
    :receiptData="receiptData"
    :metaData="metaData"
    :getReceipts="getReceipts"
    :deleteReceipt="deleteReceipt"
    :editReceipt="editReceipt"
    :cloneReceipt="cloneReceipt"
  />
</template>
