<script setup lang="ts">
import RawsAddForm from "../components/RawsAddForm.vue";
import useModule from "../useModule";

const { saveRaw, rawsData, rawTypes, producers, bunkers, updateRaw } = useModule();
</script>
<template>
  <div class="flex flex-col my-10">
    <RawsAddForm
      :saveRaw="saveRaw"
      :updateRaw="updateRaw"
      :rawsData="rawsData"
      :rawTypes="rawTypes"
      :producers="producers"
      :bunkers="bunkers"
    />
  </div>
</template>
