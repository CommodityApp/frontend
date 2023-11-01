<script setup lang="ts">
import { EyeIcon } from "@/app/assets/svg";
import { ref } from "vue";
defineProps<{
  selectedOrder: any;
  selectedBatch: any;
  index: number;
  selectedReceipt: any;
  selectedPrice: any;
  selectedOveralAmountError: any;
  selectedOveralAmount: any;
}>();

const isCalcAmountErr = ref(false);
const isCalcAmount = ref(false);
const isPrice = ref(false);

const toggleColumn = (columnName) => {
  switch (columnName) {
    case "isCalcAmountErr": {
      isCalcAmountErr.value = true;
      return;
    }
    case "isCalcAmount": {
      isCalcAmount.value = true;
      return;
    }
    case "isPrice": {
      isPrice.value = true;
      return;
    }
  }
};
</script>
<template>
  <div
    v-if="selectedOrder.length"
    class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6 mt-4"
  >
    <div class="font-bold text-xl flex align-middle items-center">
      Замес {{ index + 1 }} -
      <span
        class="bg-purple-100 text-purple-800 text-sm font-medium ml-2 mr-2 px-2.5 py-0.5 rounded"
      >
        <b>{{ selectedBatch }} кг</b>
      </span>
    </div>

    <div class="relative overflow-x-auto mt-2 sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="p-3">Сырье</th>
            <th scope="col" class="p-3">Концентр. (кг/т)</th>
            <th
              scope="col"
              class="p-3"
              :class="[isCalcAmountErr ? 'hidden' : '']"
            >
              <div class="flex items-center">
                С погреш.
                <button @click="toggleColumn('isCalcAmountErr')">
                  <EyeIcon class="w-4 h-4 mx-2" />
                </button>
              </div>
            </th>
            <th scope="col" class="p-3" :class="[isCalcAmount ? 'hidden' : '']">
              <div class="flex items-center">
                Без погреш.
                <button @click="toggleColumn('isCalcAmount')">
                  <EyeIcon class="w-4 h-4 mx-2" />
                </button>
              </div>
            </th>
            <th scope="col" class="p-3" :class="[isPrice ? 'hidden' : '']">
              <div class="flex items-center">
                Прайс
                <button @click="toggleColumn('isPrice')">
                  <EyeIcon class="w-4 h-4 mx-2" />
                </button>
              </div>
            </th>
            <th scope="col" class="p-3">Расх. (сум/кг)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b text-left text-gray-900 hover:bg-gray-50"
            v-for="(order, i) in selectedOrder"
            :key="i"
          >
            <td class="p-3">{{ order.receipt_raw?.raw?.name }}</td>
            <td class="p-3">{{ order.receipt_raw?.ratio }}</td>
            <td class="p-3" :class="[isCalcAmountErr ? 'hidden' : '']">
              {{ order.calculated_amount_with_error[index] }}
            </td>
            <td class="p-3" :class="[isCalcAmount ? 'hidden' : '']">
              {{ order.calculated_amount[index] }}
            </td>
            <td class="p-3" :class="[isPrice ? 'hidden' : '']">
              {{ order.price }}
            </td>
            <td class="p-3">
              {{
                (
                  (order.receipt_raw?.ratio * order.price) /
                  selectedReceipt.concentration
                ).toFixed(3)
              }}
            </td>
          </tr>
        </tbody>
        <tr>
          <th scope="col" class="p-3">Итого:</th>
          <th class="p-3">{{ selectedReceipt.concentration }}</th>
          <th class="p-3" :class="[isCalcAmountErr ? 'hidden' : '']">
            {{ selectedOveralAmountError[index] }}
          </th>
          <th class="p-3" :class="[isCalcAmount ? 'hidden' : '']">
            {{ selectedOveralAmount[index] }}
          </th>
          <th class="p-3" :class="[isPrice ? 'hidden' : '']">
            <!-- {{ selectedPrice }} -->
          </th>
          <th class="p-3"></th>
        </tr>
      </table>
    </div>
  </div>
  <div v-else class="text-2xl text-center p-16 text-gray-300">Нет данных</div>
</template>
