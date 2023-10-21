<script setup lang="ts">
import { ArrowIcon } from "../../../app/assets/svg";
import { Pagination } from 'flowbite-vue'
import { ref } from 'vue'

const currentPage = ref(1)
defineProps<{
  isLoading: boolean
  activitiesData: any
  metaData: any
  getActivities: any
}>();
// const deleteSingleClient = (id, name) => {
//   window.confirm(`Вы действительно хотите удалить ${name} клиента?`) ? props.deleteClient(id) : null
// }
// const editSingleClient = (id) => {
//   props.editClient(id)
// }
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div
      v-if="isLoading"
      class="flex items-center mt-1 justify-center w-full h-[70vh] sm:rounded-lg bg-white"
    >
      <div
        class="px-3 py-1 text-sm font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse"
      >
        Загрузка данных...
      </div>
    </div>
    
    <div v-else>
      <div v-if=" activitiesData?.length">
      <table
        class="w-full text-sm text-left text-gray-500"
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">№</th>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">Описание</th>
            <th scope="col" class="px-6 py-3">Действие выполнил</th>
            <th scope="col" class="px-6 py-3">Отредактировано в</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(activity, index) in activitiesData"
            :key="index"
            class="bg-white border-b cursor-pointer text-gray-900 hover:bg-gray-50"
          >
            <td class="px-6 py-4">{{ index + 1 }}</td>
            <td class="px-6 py-4">{{ activity?.id }}</td>
            <td class="px-6 py-4">{{ activity?.description }}</td>
            <td class="px-6 py-4">{{ activity?.causer?.name }}</td>
            <td class="px-6 py-4">{{ activity?.created_at }}</td>
            <!-- <td class="px-6 py-4 flex gap-x-4 justify-end"> -->
              <!-- <EditIcon
                @click.stop="editSingleClient(client.id)"
                class="w-5 h-5 mr-2 text-[#7000FF] cursor-pointer"
              /> -->
              <!-- <DeleteIcon
                @click.stop="deleteSingleClient(client.id, client.name)"
                class="w-5 h-5 text-red-700 hover:outline hover:outline-red-200 rounded-[4px] cursor-pointer"
              /> -->
            <!-- </td> -->
          </tr>
        </tbody>

      </table>
      
      <div class="m-4 flex flex-row justify-between">
        <div class="m-1 mr-2">
          Страница: № {{ currentPage }} из {{ Math.ceil(metaData?.total/15) }}
        </div>
        
        <Pagination 
          v-model="currentPage" 
          :total-items="metaData?.total"
          :perPage="15" 
          :showLabels="false"
        >
        <template #prev-icon>
          <ArrowIcon class="w-4 h-4"/>
        </template>
        <template #next-icon>
          <ArrowIcon class="w-4 h-4 rotate-180"/>
        </template>
        <template v-slot:page-button="{ page, setPage }">
          <button
            @click="setPage(page), getActivities(page)"
            :class="{'text-purple-600 border border-purple-400 bg-gray-200': page == currentPage}"
            class="flex items-center justify-center first:rounded-l-lg last:rounded-r-lg px-3 h-8 ml-0 leading-tight text-gray-900 border border-gray-300 hover:bg-gray-200"
          >
            {{ page }}
          </button>
        </template>
        </Pagination>
      </div>
    </div>

      <div v-else class="text-2xl text-center p-16 text-gray-300">
        Нет данных
      </div>
    </div>
  </div>
</template>
