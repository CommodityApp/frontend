<script setup lang="ts">
import { DeleteIcon } from "../../../app/assets/svg";
import PaginationFooter from "@/app/components/PaginationFooter.vue";
const props = defineProps<{
  isLoading: boolean;
  rawTypesData: any;
  deleteRawType: any;
  editRawType: any;
  metaData: any;
  getRawTypes: any;
}>();
const deleteSingleRawType = (id, name) => {
  window.confirm(`Вы действительно хотите удалить ${name} Тип Сырья?`)
    ? props.deleteRawType(id)
    : null;
};
const editSingleRawType = (id) => {
  props.editRawType(id);
};
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
      <div v-if="rawTypesData?.length">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">№</th>
              <th scope="col" class="px-6 py-3">Имя</th>
              <th scope="col" class="px-6 py-3">Единица</th>
              <th scope="col" class="px-6 py-3">Создан кем</th>
              <th scope="col" class="px-6 py-3">Дата редактирования</th>
              <th scope="col" class="px-6 py-3 text-end">Действия</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(producer, index) in rawTypesData"
              :key="index"
              @click="editSingleRawType(producer.id)"
              class="bg-white border-b cursor-pointer text-gray-900 hover:bg-gray-50"
            >
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ producer?.name }}</td>
              <td class="px-6 py-4">{{ producer?.unit }}</td>
              <td class="px-6 py-4">{{ producer?.first_activity?.causer }}</td>
              <td class="px-6 py-4">{{ producer?.updated_at }}</td>
              <td class="px-6 py-4 flex gap-x-4 justify-end">
                <!-- <EditIcon
                @click.stop="editSingleClient(client.id)"
                class="w-5 h-5 mr-2 text-[#7000FF] cursor-pointer"
              /> -->
                <DeleteIcon
                  @click.stop="deleteSingleRawType(producer.id, producer.name)"
                  class="w-5 h-5 text-red-700 hover:outline hover:outline-red-200 rounded-[4px] cursor-pointer"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationFooter
          v-if="metaData?.last_page > 1"
          :metaData="metaData"
          :getData="getRawTypes"
        />
      </div>

      <div v-else class="text-2xl text-center p-16 text-gray-300">
        Нет данных
      </div>
    </div>
  </div>
</template>
