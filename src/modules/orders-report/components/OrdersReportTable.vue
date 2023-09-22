<template>
  <div
    class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6 mt-4"
  >
    <div class="font-bold text-xl">Замес 1</div>

    <div class="relative overflow-x-auto mt-2 sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Сырье</th>
            <th scope="col" class="px-6 py-3">кг/т</th>
            <th scope="col" class="px-6 py-3">С погрешность (1000)</th>
            <th scope="col" class="px-6 py-3">Без погрешность (1000)</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b text-left hover:bg-gray-50">
            <td class="px-6 py-4">Метионин</td>
            <td class="px-6 py-4">1,500</td>
            <td class="px-6 py-4">75,375</td>
            <td class="px-6 py-4">75,000</td>
          </tr>
          <tr class="bg-white border-b text-left hover:bg-gray-50">
            <td class="px-6 py-4">Минер, 82048</td>
            <td class="px-6 py-4">1,000</td>
            <td class="px-6 py-4">50,250</td>
            <td class="px-6 py-4">50,000</td>
          </tr>
        </tbody>
        <tr>
            <th scope="col" class="px-6 py-3">Итого:</th>
            <th class="px-6 py-4">1,500</th>
            <th class="px-6 py-4">75,375</th>
            <th class="px-6 py-4">75,000</th>
        </tr>
      </table>
      <!-- <div v-else class="text-2xl text-center p-16 text-gray-300">
      No Data found
    </div> -->
    </div>
  </div>
</template>
