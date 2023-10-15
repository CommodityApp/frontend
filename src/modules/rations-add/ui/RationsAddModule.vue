<script setup lang="ts">
import RationsAddForm from '../components/RationsAddForm.vue';
import useModule from '../useModule';

const { singleRation, rawsData, isLoading, queryType, receiptsData, onSaveRation } = useModule()
</script>
<template>
    <div class="flex flex-col my-10">
        <RationsAddForm
            :isLoading="isLoading"
            :rawsData="rawsData"
            :receiptsData="receiptsData"
            :singleRation="singleRation"
            :queryType="queryType"
            @onSaveRation="onSaveRation"
        />
    </div>
</template>