<script setup lang="ts">
import { RouterLink } from "vue-router";
import { OrderIcon, RecipeIcon } from "../assets/svg";
</script>
<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border border-r border-gray-200 sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
      <ul class="space-y-2 font-medium">
        <li>
          <RouterLink
            to="/orders"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <OrderIcon
              class="flex-shrink-0 w-5 h-5 text-gray-900"
            />
            <span class="ml-3">Заказы</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/receipts"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <RecipeIcon
              class="flex-shrink-0 w-5 h-5 text-gray-900"
            />
            <span class="ml-3">Рецепты</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>
