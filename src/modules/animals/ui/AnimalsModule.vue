<script setup lang="ts">
import AnimalsHeader from "../components/AnimalsHeader.vue";
import AnimalsTable from "../components/AnimalsTable.vue";

import useModule from "../useModule";

const { isLoading, animalsData, editAnimalsTypes, deleteAnimalTypes } = useModule()
</script>
<template>
    <AnimalsHeader />
    <AnimalsTable 
        :isLoading="isLoading"
        :animalsData="animalsData" 
        :editAnimalsTypes="editAnimalsTypes"
        :deleteAnimalTypes="deleteAnimalTypes"
    />
</template>