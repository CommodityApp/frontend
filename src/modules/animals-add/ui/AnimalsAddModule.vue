<script setup lang="ts">
import PricesAddForm from '../components/PricesAddForm.vue';
import useModule from '../useModule';

const { isLoading,
        singleAnimalType,
        queryType,
        editAnimalType,
        deleteAnimalTypes,
        saveAnimalTypes } = useModule()
</script>
<template>
    <div class="flex flex-col my-10">
        <PricesAddForm
            :isLoading="isLoading"
            :singleAnimalType="singleAnimalType"
            :queryType="queryType"
            :editAnimalType="editAnimalType"
            :deleteAnimalTypes="deleteAnimalTypes"
            @saveAnimalTypes="saveAnimalTypes"
        />
    </div>
</template>