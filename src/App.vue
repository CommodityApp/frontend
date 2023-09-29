<script setup lang="ts">
import { onUpdated, computed } from "vue";
import { useRoute } from 'vue-router';
import { initFlowbite } from 'flowbite';
import MainLayout from "@/app/layouts/MainLayout.vue";
import AuthLayout from "@/app/layouts/AuthLayout.vue";

const route = useRoute();
// custom layout switcher by route path change
const layout = computed(() => route.path === '/login' ? AuthLayout : MainLayout);

onUpdated(() => {
    initFlowbite();
})
</script>
<template>
  <notifications style="top: 15px;" />
  <component :is="layout" />
</template>