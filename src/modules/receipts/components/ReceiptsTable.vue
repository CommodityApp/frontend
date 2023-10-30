<script setup lang="ts">
import { DeleteIcon, EditIcon, CloneIcon } from "@/app/assets/svg";
import PaginationFooter from "@/app/components/PaginationFooter.vue";
const props = defineProps<{
  receiptData: any;
  isLoading: boolean;
  deleteReceipt: any;
  editReceipt: any;
  cloneReceipt: any;
  metaData: any;
  getReceipts: any;
}>();

const deleteReceiptById = (id, name) => {
  window.confirm(`Вы действительно хотите удалить рецепт ${name} ?`)
    ? props.deleteReceipt(id)
    : null;
};

const editReceiptById = (id) => {
  props.editReceipt(id);
};

const cloneReceiptById = (id, param) => {
  props.cloneReceipt(id, param);
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
      <div v-if="receiptData?.length">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">№</th>
              <th scope="col" class="px-6 py-3">Код рецепта</th>
              <th scope="col" class="px-6 py-3">Название рецепта</th>
              <th scope="col" class="px-6 py-3">Ед. измерения</th>
              <th scope="col" class="px-6 py-3">Категория</th>
              <th scope="col" class="px-6 py-3">Производитель</th>
              <th scope="col" class="px-6 py-3">Норма ввода (%)</th>
              <th scope="col" class="px-6 py-3">Концентрация</th>
              <th scope="col" class="px-6 py-3">Действия</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(receipt, index) in receiptData"
              :key="index"
              @click="editReceiptById(receipt.id)"
              class="bg-white cursor-pointer border-b text-gray-900 hover:bg-gray-50"
            >
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ receipt.code }}</td>
              <td class="px-6 py-4">{{ receipt.name }}</td>
              <td class="px-6 py-4">{{ receipt.unit }}</td>
              <td class="px-6 py-4">-</td>
              <td class="px-6 py-4">{{ receipt.producer_name }}</td>
              <td class="px-6 py-4">{{ receipt.rate }}</td>
              <td class="px-6 py-4">{{ receipt.concentration }}</td>
              <td class="px-6 py-4 flex gap-x-4">
                <CloneIcon
                  @click.stop="cloneReceiptById(receipt.id, 'clone')"
                  class="w-5 h-5 mr-2 text-[#FFA41D] hover:outline hover:outline-orange-200 rounded-[4px] cursor-pointer"
                />
                <!-- <EditIcon 
              class="w-5 h-5 mr-2 text-[#7000FF] cursor-pointer"
            /> -->
                <DeleteIcon
                  @click.stop="deleteReceiptById(receipt.id, receipt.name)"
                  class="w-5 h-5 text-red-700 hover:outline hover:outline-red-200 rounded-[4px] cursor-pointer"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationFooter
          v-if="metaData?.last_page > 1"
          :metaData="metaData"
          :getData="getReceipts"
        />
      </div>
      <div v-else class="text-2xl text-center p-16 text-gray-300">
        Нет данных
      </div>
    </div>
  </div>
</template>
