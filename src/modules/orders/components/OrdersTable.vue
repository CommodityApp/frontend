<script setup lang="ts"></script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between pb-4 bg-white">
      <label for="table-search" class="sr-only">Search</label>
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
    </div>

    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Клиент</th>
          <th scope="col" class="px-6 py-3">Дата</th>
          <th scope="col" class="px-6 py-3">Кол-во (кг)</th>
          <th scope="col" class="px-6 py-3">Рецепт</th>
        </tr>
      </thead>

      <tbody>
        <tr class="bg-white border-b hover:bg-gray-50">
          <td class="px-6 py-4">Rovomix</td>
          <td class="px-6 py-4">12.03.2023</td>
          <td class="px-6 py-4">45,400</td>
          <td class="px-6 py-4">R1</td>
        </tr>
        <tr class="bg-white border-b hover:bg-gray-50">
          <td class="px-6 py-4">Rovomix2</td>
          <td class="px-6 py-4">22.09.2023</td>
          <td class="px-6 py-4">75,400</td>
          <td class="px-6 py-4">R3</td>
        </tr>
      </tbody>
    </table>

    <!-- <div v-else class="text-2xl text-center p-16 text-gray-300">
      No Data found
    </div> -->
  </div>
</template>
