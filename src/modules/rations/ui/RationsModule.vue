<script setup lang="ts">
import RationHeader from "../components/RationHeader.vue";
import RationTable from "../components/RationTable.vue";
import useModule from "../useModule";

const {
  rationData,
  isLoading,
  metaData,
  getRations,
  deleteRation,
  editRation,
  cloneRation,
} = useModule();
</script>
<template>
  <RationHeader />
  <RationTable
    :isLoading="isLoading"
    :rationData="rationData"
    :metaData="metaData"
    :getRations="getRations"
    :deleteRation="deleteRation"
    :editRation="editRation"
    :cloneRation="cloneRation"
  />
</template>
