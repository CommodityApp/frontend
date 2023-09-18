<script setup lang="ts"></script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Код сырья</th>
          <th scope="col" class="px-6 py-3">Название сырья</th>
          <th scope="col" class="px-6 py-3">Ед. измерения (кг)</th>
          <th scope="col" class="px-6 py-3">Категория</th>
          <th scope="col" class="px-6 py-3">Производитель</th>
          <th scope="col" class="px-6 py-3">Норма ввода (%)</th>
          <th scope="col" class="px-6 py-3">Концентрация</th>
        </tr>
      </thead>

      <tbody>
        <tr class="bg-white border-b hover:bg-gray-50">
          <td class="px-6 py-4">1</td>
          <td class="px-6 py-4">Минеральная смесь</td>
          <td class="px-6 py-4">45</td>
          <td class="px-6 py-4">Витаминная смесь, мин., ферменты</td>
          <td class="px-6 py-4">Agromix</td>
          <td class="px-6 py-4">2</td>
          <td class="px-6 py-4">ферменты</td>
        </tr>
        <tr class="bg-white border-b hover:bg-gray-50">
          <td class="px-6 py-4">2</td>
          <td class="px-6 py-4">Витамины</td>
          <td class="px-6 py-4">3</td>
          <td class="px-6 py-4">мин., ферменты</td>
          <td class="px-6 py-4">Agro</td>
          <td class="px-6 py-4">4</td>
          <td class="px-6 py-4">ферменты</td>
        </tr>
      </tbody>
    </table>

    <!-- <div v-else class="text-2xl text-center p-16 text-gray-300">
      No Data found
    </div> -->
  </div>
</template>
