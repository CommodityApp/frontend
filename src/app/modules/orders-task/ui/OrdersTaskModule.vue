<script setup lang="ts">
import Breadcrumb from "../../../components/Breadcrumb.vue";
import OrdersTaskHeader from "../components/OrdersTaskHeader.vue";
import OrdersTaskForm from "../components/OrdersTaskForm.vue";
</script>
<template>
    <div class="my-10">
        <Breadcrumb />
        <div class="text-2xl font-bold leading-7 my-4">Задача на производству</div>
        <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6">
            <OrdersTaskHeader />
            <hr class="h-px my-8 bg-gray-200 border-0" />
            <OrdersTaskForm />
        </div>
    </div>
</template>