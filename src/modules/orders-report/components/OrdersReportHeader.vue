<script setup lang="ts">
defineProps<{
  selectedData: any
}>()
</script>
<template>
    <div class="flex flex-row justify-between">
      <div class="flex flex-row flex-wrap gap-y-2 justify-start">
        <div class="text-black mr-6 p-2 items-center rounded-[0.8rem] bg-[#F3F4F6]">
          <span class="text-[#696969] text-sm font-medium leading-5">
            Рецепт:
          </span>
          <span class="font-bold ml-1">{{ selectedData?.receipt?.name }}</span>
        </div>

        <div class="flex text-black mr-6 p-2 items-center rounded-[0.8rem] bg-[#F3F4F6]">
          <span class="text-[#696969] text-sm font-medium leading-5">
            Кол-во:
          </span>
          <span class="font-bold ml-1">{{ selectedData?.amount }} (кг)</span>
        </div>

        <div class="text-black mr-6 p-2 items-center rounded-[0.8rem] bg-[#F3F4F6]">
          <span class="text-[#696969] text-sm font-medium leading-5">
            [Вид/Тип] животных:
          </span>
          <span class="font-bold ml-1">{{ selectedData?.receipt?.animal_type?.name }}</span>
        </div>

        <div class="text-black mr-6 p-2 items-center rounded-[0.8rem] bg-[#F3F4F6]">
          <span class="text-[#696969] text-sm font-medium leading-5">
            Дата:
          </span>
          <span class="font-bold ml-1">{{selectedData?.date}}</span>
        </div>

        <div class="text-black mr-6 p-2 items-center rounded-[0.8rem] bg-[#F3F4F6]">
          <span class="text-[#696969] text-sm font-medium leading-5">
            Имя клиента:
          </span>
          <span class="font-bold ml-1">{{selectedData?.client.name}}</span>
        </div>
      </div>
    </div>
  </template>
  