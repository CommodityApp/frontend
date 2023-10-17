<script setup lang="ts">
defineProps<{
  selectedOrder: any,
  selectedBatch: any,
  index: number,
  selectedReceipt: any,
  selectedPrice: any,
  selectedOveralAmountError: any,
  selectedOveralAmount: any
}>()
</script>
<template>
  <div
    v-if="selectedOrder.length" 
    class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6 mt-4"
  >
    <div class="font-bold text-xl flex align-middle items-center">
      Замес {{ index + 1 }} - 
      <span class="bg-purple-100 text-purple-800 text-sm font-medium ml-2 mr-2 px-2.5 py-0.5 rounded">
        <b>{{selectedBatch}} кг</b>
      </span>
    </div>

    <div class="relative overflow-x-auto mt-2 sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Сырье</th>
            <th scope="col" class="px-6 py-3">Концентрация (кг/т)</th>
            <th scope="col" class="px-6 py-3">Прайс</th>
            <th scope="col" class="px-6 py-3">С погрешностью</th>
            <th scope="col" class="px-6 py-3">Без погрешность</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            class="bg-white border-b text-left text-gray-900 hover:bg-gray-50"
            v-for="order, i in selectedOrder"
            :key="i"
          >
            <td class="px-6 py-4">{{order.receipt_raw?.raw?.name}}</td>
            <td class="px-6 py-4">{{order.receipt_raw?.ratio}}</td>
            <td class="px-6 py-4">{{order.price}}</td>
            <td class="px-6 py-4">{{order.calculated_amount_with_error[index]}}</td>
            <td class="px-6 py-4">{{order.calculated_amount[index]}}</td>
          </tr>
        </tbody>
        <tr>
            <th scope="col" class="px-6 py-3">Итого:</th>
            <th class="px-6 py-4">{{selectedReceipt.concentration}}</th>
            <th class="px-6 py-4">{{selectedPrice}}</th>
            <th class="px-6 py-4">{{selectedOveralAmountError[index]}}</th>
            <th class="px-6 py-4">{{selectedOveralAmount[index]}}</th>
        </tr>
      </table>
      
    </div>
  </div>
  <div v-else class="text-2xl text-center p-16 text-gray-300">
    Нет данных
  </div>
</template>
