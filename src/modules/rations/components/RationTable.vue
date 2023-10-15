<script setup lang="ts">
import { DeleteIcon, EditIcon, CloneIcon } from "../../../app/assets/svg";
const props = defineProps<{
  rationData: any,
  isLoading: boolean,
  deleteRation: any,
  editRation: any,
  cloneRation: any
}>()

const deleteRationById = (id, name) => {
  window.confirm(`Вы действительно хотите удалить Рацион ${name} ?`) 
  ? props.deleteRation(id) : null
}

const editRationById = (id) => {
  props.editRation(id)
}

const cloneRationById = (id, param) => {
  props.cloneRation(id, param)
}

</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div 
      v-if="isLoading" 
      class="flex items-center mt-1 justify-center w-full h-[70vh] bg-white">
      <div class="px-3 py-1 text-sm font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse">
        Загрузка данных...
      </div>
    </div>
    <div v-else>
        <table 
            v-if="rationData?.length"
            class="w-full text-sm text-left text-gray-500"
            >
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
            <th scope="col" class="px-6 py-3">№</th>
            <th scope="col" class="px-6 py-3">Код</th>
            <th scope="col" class="px-6 py-3">Имя производителя</th>
            <th scope="col" class="px-6 py-3">Название</th>
            <th scope="col" class="px-6 py-3">Единица</th>
            <th scope="col" class="px-6 py-3">Рецепт</th>
            <th scope="col" class="px-6 py-3">Создан</th>
            <th scope="col" class="px-6 py-3">Создан кем</th>
            <th scope="col" class="px-6 py-3 text-end">Действия</th>
            </tr>
        </thead>

        <tbody>
            <tr 
            v-for="ration, index in rationData" 
            :key="index"
            @click="editRationById(ration.id)"
            class="bg-white border-b cursor-pointer text-gray-900 hover:bg-gray-50"
            >
            <td class="px-6 py-4">{{ index + 1 }}</td>
            <td class="px-6 py-4">{{ ration.code }}</td>
            <td class="px-6 py-4">{{ ration.producer_name }}</td>
            <td class="px-6 py-4">{{ ration.name }}</td>
            <td class="px-6 py-4">{{ ration.unit }}</td>
            <td class="px-6 py-4">{{ ration?.receipt?.id }}</td>
            <td class="px-6 py-4">{{ ration.created_at }}</td>
            <td class="px-6 py-4">{{ ration.first_activity.causer.name }}</td>
            <td class="px-6 py-4 flex justify-end gap-x-4">
              <CloneIcon 
                @click.stop="cloneRationById(ration.id, 'clone')"
                class="w-5 h-5 mr-2 text-[#FFA41D] hover:outline hover:outline-orange-200 rounded-[4px] cursor-pointer"
              />
                <!-- <EditIcon
                class="w-5 h-5 mr-2 text-[#7000FF] cursor-pointer"
                /> -->
              <DeleteIcon
                @click.stop="deleteRationById(ration.id, ration.name)" 
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
