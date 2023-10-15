<script setup lang="ts">
import { RouterLink } from "vue-router";
import { 
    OrderIcon, 
    RecipeIcon, 
    RawsIcon, 
    AnimalsIcon, 
    UsersIcon,
    ClientsIcon,
    PricesIcon,
    RationsIcon,
    UserActivityIcon,
    ProgressIcon,
    ProducersIcon,
    RawTypesIcon
  } from "../assets/svg";  
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
              class="flex-shrink-0 w-6 h-6 text-gray-900"
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
              class="flex-shrink-0 w-6 h-6 text-gray-900"
            />
            <span class="ml-3">Рецепты</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/raw-types"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <RawTypesIcon
              class="flex-shrink-0 w-6 h-6 text-gray-900"
            />
            <span class="ml-3">Тип Сырья</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/raws"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <RawsIcon
              class="flex-shrink-0 w-6 h-6 text-gray-900"
            />
            <span class="ml-3">Cырьё</span>
            <!-- <ProgressIcon class="w-4 h-4 ml-24 text-red-700" /> -->
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/prices"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <PricesIcon
              class="flex-shrink-0 w-6 h-6 text-gray-900"
            />
            <span class="ml-3">Прейскуранты</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/rations"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <RationsIcon
              class="flex-shrink-0 w-6 h-6 text-gray-900"
            />
            <span class="ml-3">Рационы</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/animals"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <AnimalsIcon
              class="flex-shrink-0 w-6 h-6 text-gray-900"
            />
            <span class="ml-3">Виды животных</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/producers"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <ProducersIcon
              class="flex-shrink-0 w-6 h-6 text-gray-900"
            />
            <span class="ml-3">Производители</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/clients"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <ClientsIcon
              class="flex-shrink-0 w-6 h-6 text-gray-900"
            />
            <span class="ml-3">Клиенты</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/users"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <UsersIcon
              class="flex-shrink-0 w-6 h-6 text-gray-900"
            />
            <span class="ml-3">Пользователи</span>
          </RouterLink>
        </li>
        <!-- <li>
          <RouterLink
            to="/activity"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <UserActivityIcon
              class="flex-shrink-0 w-6 h-6 text-gray-900"
            />
            <span class="ml-3">Журнал Активности</span>
          </RouterLink>
        </li> -->
      </ul>
    </div>
  </aside>
</template>
