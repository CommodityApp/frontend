<script setup lang="ts">
import MainLayout from "@/app/layouts/MainLayout.vue";
import { onUpdated } from "vue";
import { initFlowbite } from 'flowbite';
onUpdated(() => {
    initFlowbite();
})
</script>
<template>
  <div>
    <MainLayout />
  </div>
</template>