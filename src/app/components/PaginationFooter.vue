<script setup lang="ts">
import { ArrowIcon } from "../../app/assets/svg";
import { Pagination } from "flowbite-vue";
import { ref } from "vue";

const props = defineProps<{
  metaData: any;
  getData: any;
}>();

const currentPage = ref(props.metaData?.current_page);
</script>
<template>
  <div class="m-4 flex flex-row justify-between">
    <div class="m-1 mr-2">
      Страница: № {{ currentPage }} из
      {{ Math.ceil(metaData?.total / 10) }}
    </div>

    <Pagination
      v-model="currentPage"
      :total-items="metaData?.total"
      :perPage="10"
      :showLabels="false"
    >
      <template #prev-icon>
        <div @click="getData(currentPage - 1)" class="p-2">
          <ArrowIcon class="w-4 h-4" />
        </div>
      </template>
      <template #next-icon>
        <div
          v-if="Math.ceil(metaData?.total / 10) > currentPage"
          @click="getData(currentPage + 1)"
          class="p-2"
        >
          <ArrowIcon class="w-4 h-4 rotate-180" />
        </div>
      </template>
      <template v-slot:page-button="{ page, setPage }">
        <button
          @click="setPage(page), getData(page)"
          :class="{
            'text-purple-600 border border-purple-400 bg-gray-200':
              page == currentPage,
          }"
          class="flex items-center justify-center first:rounded-l-lg last:rounded-r-lg px-3 h-8 ml-0 leading-tight text-gray-900 border border-gray-300 hover:bg-gray-200"
        >
          {{ page }}
        </button>
      </template>
    </Pagination>
  </div>
</template>
