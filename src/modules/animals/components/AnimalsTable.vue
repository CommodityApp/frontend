<script setup lang="ts">
import { DeleteIcon } from "../../../app/assets/svg";
const props = defineProps<{
  isLoading: boolean
  animalsData: any
  deleteAnimalTypes: any
  editAnimalsTypes: any
}>();
const deleteSingleAnimalType = (id, name) => {
  window.confirm(`Вы действительно хотите удалить ${name} тип животного?`) ? props.deleteAnimalTypes(id) : null
}
const editSingleAnimalType = (id) => {
  props.editAnimalsTypes(id)
}
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div
      v-if="isLoading"
      class="flex items-center mt-1 justify-center w-full h-[70vh] bg-white"
    >
      <div
        class="px-3 py-1 text-sm font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse"
      >
        Загрузка данных...
      </div>
    </div>
    
    <div v-else>
      <table
        v-if=" animalsData?.length"
        class="w-full text-sm text-left text-gray-500"
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">№</th>
            <th scope="col" class="px-6 py-3">Имя</th>
            <th scope="col" class="px-6 py-3">Виды</th>
            <th scope="col" class="px-6 py-3 text-end">Действия</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(animals, index) in animalsData"
            :key="index"
            @click.stop="editSingleAnimalType(animals.id)"
            class="bg-white cursor-pointer border-b text-gray-900 hover:bg-gray-50"
          >
            <td class="px-6 py-4">{{ index + 1 }}</td>
            <td class="px-6 py-4">{{ animals.name }}</td>
            <td class="px-6 py-4">
                <span 
                    v-for="type, index in animals.children" 
                    :key="index"
                >
                    {{ type.name }}&nbsp;-&nbsp; 
                </span>
            </td>
            <td class="px-6 py-4 flex gap-x-4 justify-end">
              <!-- <EditIcon
                @click=""
                class="w-5 h-5 mr-2 text-[#7000FF] cursor-pointer"
              /> -->
              <DeleteIcon
                @click.stop="deleteSingleAnimalType(animals.id, animals.name)"
                class="w-5 h-5 text-red-700 hover:outline hover:outline-red-200 rounded-[4px] cursor-pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="text-2xl text-center p-16 text-gray-300">
        Нет данных
      </div>
    </div>
  </div>
</template>
