<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row justify-start">
      <div class="text-black mr-6 p-2 items-center rounded-[0.8rem] bg-[#F3F4F6]">
        <span class="text-[#696969] text-sm font-medium leading-5">
          Рецепт:
        </span>
        <span class="font-bold ml-1">R1</span>
      </div>
      <div class="flex text-black mr-6 p-2 items-center rounded-[0.8rem] bg-[#F3F4F6]">
        <span class="text-[#696969] text-sm font-medium leading-5">
          Количество:
        </span>
        <span class="font-bold ml-1">5т</span>
      </div>
    </div>

    <div>
      <RouterLink
        to="/orders/report"
        type="submit"
        class="text-[#7000ff] bg-[#F3F4F6] hover:bg-[#cfb7efb7] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Рассчитать
      </RouterLink>
    </div>
  </div>
</template>
