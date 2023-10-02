<script setup lang="ts">
import Breadcrumb from "../../../app/components/Breadcrumb.vue";
import OrdersTaskHeader from "../components/OrdersTaskHeader.vue";
import OrdersTaskForm from "../components/OrdersTaskForm.vue";
import useModule from "../useModule";
const { 
        newOrderState,
        numberOfBatches,
        batches,
        error,
        visibleAlert,
        calculateOrder,
        editOrder,
        setNumOfBatches
    } = useModule();
</script>
<template>
  <div class="my-10">
    <Breadcrumb />
    <div class="text-2xl font-bold leading-7 my-4">
        Задача на производство
    </div>
    <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6">
        <OrdersTaskHeader 
            :newOrderState="newOrderState"
            :visibleAlert="visibleAlert" 
            @calculateOrder="calculateOrder"
            @editOrder="editOrder"
        />
        <hr class="h-px my-8 bg-gray-200 border-0" />
        <OrdersTaskForm
            v-model:numberOfBatches="numberOfBatches"
            v-model:batches="batches"
            v-model:error="error"
            :visibleAlert="visibleAlert"
            @setNumOfBatches="setNumOfBatches" 
        />
    </div>
  </div>
</template>
