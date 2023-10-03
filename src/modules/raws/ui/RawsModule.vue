<script setup lang="ts">
import RawsHeader from "../components/RawsHeader.vue";
import RawsTable from "../components/RawsTable.vue";

import useModule from "../useModule";

const { isLoading, rawsData, deleteRaw, editRaw } = useModule()
</script>
<template>
    <RawsHeader />
    <RawsTable 
        :isLoading="isLoading"
        :rawsData="rawsData" 
        :deleteRaw="deleteRaw"
        :editRaw="editRaw"
    />
</template>