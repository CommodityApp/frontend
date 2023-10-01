<script setup lang="ts">
import RawsHeader from "../components/RawsHeader.vue";
import RawsTable from "../components/RawsTable.vue";

import useModule from "../useModule";

const { isLoading, rawsData } = useModule()
</script>
<template>
    <RawsHeader />
    <RawsTable 
        :isLoading="isLoading"
        :rawsData="rawsData" 
    />
</template>