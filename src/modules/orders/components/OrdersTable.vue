<script setup lang="ts">
import type { IOrders } from "../types";
import { useRouter } from "vue-router";
import { UpDownArrowIcon } from "@/app/assets/svg";
import PaginationFooter from "@/app/components/PaginationFooter.vue";
const router = useRouter();
defineProps<{
  orders: IOrders[];
  isLoading: boolean;
  metaData: any;
  getOrders: any;
}>();

const getOrderDocuments = (id: number) => {
  router.push(`/orders/task/${id}`);
};
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <!-- <div class="flex items-center justify-between pb-4 bg-white">
      <label for="table-search-users" class="sr-only">Search</label>
      <div class="relative m-3">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        ></div>
        <input
          type="text"
          id="table-search-users"
          class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
        />
      </div>
    </div> -->

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
      <div v-if="orders.length">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">№</th>
              <th scope="col" class="px-6 py-3 flex items-center">Клиент</th>
              <th scope="col" class="px-6 py-3">Дата</th>
              <th scope="col" class="px-6 py-3">Кол-во (кг)</th>
              <th scope="col" class="px-6 py-3">Рецепт</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(order, index) in orders"
              :key="index"
              class="bg-white text-gray-900 border-b cursor-pointer hover:bg-gray-50"
              @click="getOrderDocuments(order.id)"
            >
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-[#7000FF]">
                {{ order?.client?.name }}
              </td>
              <td class="px-6 py-4">{{ order.date }}</td>
              <td class="px-6 py-4">{{ order.amount }}</td>
              <td class="px-6 py-4">{{ order?.receipt?.name }}</td>
            </tr>
          </tbody>
        </table>
        <PaginationFooter
          v-if="metaData?.last_page > 1"
          :metaData="metaData"
          :getData="getOrders"
        />
      </div>

      <div v-else class="text-2xl text-center p-16 text-gray-300">
        Нет данных
      </div>
    </div>
  </div>
</template>
