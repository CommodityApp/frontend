<script setup lang="ts">
import { DeleteIcon, EditIcon } from "../../../app/assets/svg";
const props = defineProps<{
  isLoading: boolean,
  rawsData: any,
  deleteRaw: any,
  editRaw
}>();

const deleteRaw = (id, name) => {
  window.confirm(`Вы действительно хотите удалить рецепт ${name} ?`) ? props.deleteRaw(id) : null
}

const editRaw = (id) => {
  props.editRaw(id)
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
        v-if="rawsData?.length"
        class="w-full text-sm text-left text-gray-500"
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">№</th>
            <th scope="col" class="px-6 py-3">Имя</th>
            <th scope="col" class="px-6 py-3">Last Raw Price</th>
            <th scope="col" class="px-6 py-3">Описание</th>
            <th scope="col" class="px-6 py-3">Создан кем</th>
            <th scope="col" class="px-6 py-3">Oбновлено в</th>
            <th scope="col" class="px-6 py-3 text-end">Действия</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(raws, index) in rawsData"
            :key="index"
            @click="editRaw(raws.id)"
            class="bg-white cursor-pointer border-b text-gray-900 hover:bg-gray-50"
          >
            <td class="px-6 py-4">{{ index + 1 }}</td>
            <td class="px-6 py-4">{{ raws?.name }}</td>
            <td class="px-6 py-4">{{ raws.last_raw_price?.price }}</td>
            <td class="px-6 py-4">{{ raws?.description?.slice(0,150) }}</td>
            <td class="px-6 py-4">{{ raws?.first_activity?.causer?.name }}</td>
            <td class="px-6 py-4">{{ raws?.updated_at }}</td>
            <td class="px-6 py-4 flex gap-x-4 justify-end">
              <DeleteIcon
                @click.stop="deleteRaw(raws.id, raws?.name)"
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
