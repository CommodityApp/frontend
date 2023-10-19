<script setup lang="ts">
import Form from '../components/Form.vue';

import useModule from '../useModule';

const { isLoading,
        animalTypesData,
        saveAnimalTypes,
        updateAnimalTypes,
        addChildAnimal,
        editChildAnimal,
        deleteChildAnimalTypes } = useModule()
</script>
<template>
    <div class="flex flex-col my-10">
        <Form 
            :isLoading="isLoading"
            :animalTypesData="animalTypesData"
            :saveAnimalTypes="saveAnimalTypes"
            :updateAnimalTypes="updateAnimalTypes"
            :deleteChildAnimalTypes="deleteChildAnimalTypes"
            :addChildAnimal="addChildAnimal"
            :editChildAnimal="editChildAnimal"
        />
    </div>
</template>