<script setup lang="ts">
import { DeleteIcon, EditIcon } from "@/app/assets/svg";
const props = defineProps<{
  receiptData: any,
  isLoading: boolean,
  deleteReceipt: any,
  editReceipt
}>()

const deleteReceiptById = (id, name) => {
  window.confirm(`Вы действительно хотите удалить рецепт ${name} ?`) 
  ? props.deleteReceipt(id) : null
}

const editReceiptById = (id) => {
  props.editReceipt(id)
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
    <table 
      v-else 
      class="w-full text-sm text-left text-gray-500"
    >
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Код сырья</th>
          <th scope="col" class="px-6 py-3">Название сырья</th>
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
          v-for="receipt, index in receiptData" 
          :key="index"
          class="bg-white border-b text-gray-900 hover:bg-gray-50"
        >
          <td class="px-6 py-4">{{ receipt.code }}</td>
          <td class="px-6 py-4">{{ receipt.name }}</td>
          <td class="px-6 py-4">{{ receipt.unit }}</td>
          <td class="px-6 py-4">-</td>
          <td class="px-6 py-4">{{receipt.producer_name}}</td>
          <td class="px-6 py-4">{{ receipt.rate }}</td>
          <td class="px-6 py-4">{{ receipt.concentration }}</td>
          <td class="px-6 py-4 flex gap-x-4">
            <EditIcon 
              @click=editReceiptById(receipt.id)
              class="w-5 h-5 mr-2 text-[#7000FF] cursor-pointer"
            />
            <DeleteIcon
              @click="deleteReceiptById(receipt.id, receipt.name)" 
              class="w-5 h-5 text-red-700 cursor-pointer"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <div v-else class="text-2xl text-center p-16 text-gray-300">
      No Data found
    </div> -->
  </div>
</template>
