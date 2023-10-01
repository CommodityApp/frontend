<script setup lang="ts">
import { AddIcon } from "../../../app/assets/svg";
</script>
<template>
  <div class="flex flex-row justify-between py-4 mt-8 w-full">
    <div class="self-center text-2xl font-bold leading-7">Пользователи</div>
    <div>
      <button
        class="flex flex-row bg-[#7000FF] text-white rounded-[0.8rem] py-[0.4rem] px-[0.9rem]"
        @click=""
        to=""
      >
        <AddIcon class="w-6 h-6 self-center mr-2" />
        Добавить
      </button>
    </div>
  </div>
</template>
