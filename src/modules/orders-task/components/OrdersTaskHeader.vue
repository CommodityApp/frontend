<script setup lang="ts">
import useOrdersStore from '@/app/stores/OrdersStore';

const ordersStore = useOrdersStore()
defineProps<{
  newOrderState: any,
  visibleAlert: Boolean
}>()
const emit = defineEmits<{
  calculateOrder,
  editOrder
}>()
const calculateOrder = () => {
  emit("calculateOrder")
}

const editOrder = () => {
  emit("editOrder")
}
</script>
<template>

  <div class="flex flex-row justify-between">
    <div class="flex flex-row justify-start">
      <div class="text-black mr-6 p-2 items-center rounded-[0.8rem] bg-[#F3F4F6]">
        <span class="text-[#696969] text-sm font-medium leading-5">
          <!-- Рецепт: -->
        </span>
        <span class="font-bold ml-1">{{ newOrderState.receipt_name }}</span>
      </div>
      <div class="flex text-black mr-6 p-2 items-center rounded-[0.8rem] bg-[#F3F4F6]">
        <span class="text-[#696969] text-sm font-medium leading-5">
          Количество:
        </span>
        <span class="font-bold ml-1">
          {{ newOrderState.amount }} (кг)
        </span>
      </div>
    </div>

    <div>
      <button
        v-if="ordersStore.isEditState"
        @click="editOrder"
        :disabled="(visibleAlert as boolean)"
        class="text-[#7000ff] cursor-pointer disabled:cursor-not-allowed bg-[#F3F4F6] hover:bg-[#cfb7efb7] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
      Сохранить изменения
    </button>
    <button
        v-else
        @click="calculateOrder"
        :disabled="(visibleAlert as boolean)"
        class="text-[#7000ff] cursor-pointer disabled:cursor-not-allowed bg-[#F3F4F6] hover:bg-[#cfb7efb7] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Рассчитать
    </button>
    </div>
  </div>
</template>
