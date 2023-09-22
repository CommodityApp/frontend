<script setup lang="ts">
import { ArrowDownIcon } from "../assets/svg/index";
</script>
<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <RouterLink
          to="/orders"
          class="inline-flex items-center text-sm font-medium text-[#999999] hover:text-[#7000FF]"
        >
          Заказы
        </RouterLink>
      </li>
      <li aria-current="page" class="inline-flex items-center">
        <div class="flex items-center">
          <ArrowDownIcon class="w-6 h-6 -rotate-90 text-gray-400" />
          <RouterLink
          to="/orders/add"
            class="ml-1 inline-flex items-center text-sm font-medium text-[#999999] hover:text-[#7000FF]"
          >
            Создать заказ
          </RouterLink>
        </div>
      </li>

      <li>
        <div class="flex items-center">
          <ArrowDownIcon class="w-6 h-6 -rotate-90 text-gray-400" />
          <RouterLink
            to="/orders/task"
            class="ml-1 text-sm font-medium text-[#999999] hover:text-[#7000FF] md:ml-2"
            >Задача на производство
          </RouterLink>
        </div>
      </li>

      <li>
        <div class="flex items-center">
          <ArrowDownIcon class="w-6 h-6 -rotate-90 text-gray-400" />
          <!-- <span class="ml-1 text-sm font-medium text-[#999999] md:ml-2"
            >Результат
          </span> -->
          <RouterLink
            to="/orders/report"
            class="ml-1 text-sm font-medium text-[#999999] hover:text-[#7000FF] md:ml-2"
            >Отчет на производство
          </RouterLink>
        </div>
      </li>
    </ol>
  </nav>
</template>
