<script setup lang="ts">
import {computed} from "vue";
import { ArrowDownIcon } from "../assets/svg/index.jsx";
import { useRoute } from "vue-router";

const route = useRoute()

const isActiveRoute = computed( () => {
  return route.path == '/orders/task'
})

</script>
<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <a
          href="/orders"
          class="inline-flex items-center text-sm font-medium text-[#999999] hover:text-[#7000FF]"
        >
          Заказы
      </a>
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
          <p
            :class="{'router-link-active': isActiveRoute}"
            class="ml-1 text-sm font-medium text-[#999999] hover:text-[#7000FF] md:ml-2"
            >Задача на производство
        </p>
        </div>
      </li>

      <!-- <li>
        <div class="flex items-center">
          <ArrowDownIcon class="w-6 h-6 -rotate-90 text-gray-400" />
          <p
            to=""
            class="ml-1 text-sm font-medium text-[#999999]  md:ml-2"
            >Документ на производство
        </p>
        </div>
      </li> -->
    </ol>
  </nav>
</template>
