<script setup lang="ts">
import RawTypesHeader from "../components/RawTypesHeader.vue";
import RawTypesTable from "../components/RawTypesTable.vue";

import useModule from "../useModule";

const { isLoading,
        rawTypesData,
        deleteRawType,
        editRawType } = useModule()
</script>
<template>
    <RawTypesHeader />
    <RawTypesTable 
        :isLoading="isLoading"
        :rawTypesData="rawTypesData"
        :deleteRawType="deleteRawType" 
        :editRawType="editRawType"
    />
</template>