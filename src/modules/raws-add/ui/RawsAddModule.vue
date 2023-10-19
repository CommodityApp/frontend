<script setup lang="ts">
import RawsAddForm from "../components/RawsAddForm.vue";
import useModule from "../useModule";

const { isLoading, saveRaw, rawsData, rawTypes, producers, bunkers, updateRaw } = useModule();
</script>
<template>
  <div class="flex flex-col my-10">
    <RawsAddForm
      :isLoading="isLoading"
      :saveRaw="saveRaw"
      :updateRaw="updateRaw"
      :rawsData="rawsData"
      :rawTypes="rawTypes"
      :producers="producers"
      :bunkers="bunkers"
    />
  </div>
</template>
