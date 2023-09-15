<script setup lang="ts">
import { MinusIcon, PlusIcon } from "../../../app/assets/svg";
import { reactive, ref } from "vue";

const numberOfBatches = ref<number>(1);
const batches = reactive<[]>([]);

const setNumOfBatches = (num) => {
    if(num > 0){
        numberOfBatches.value++;
    } else if(numberOfBatches.value > 0) {
        numberOfBatches.value--;
    }
};
</script>

<template>
  <div class="flex flex-row flex-wrap mt-4 gap-2">
    <div class="relative z-0 mb-6 mr-2 group">
      <input
        type="text"
        name="floating_first_name"
        id="floating_first_name"
        class="min-w-[10rem] px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
        placeholder=" "
        required
      />
      <label
        for="floating_first_name"
        class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >Погрешность (%)</label
      >
    </div>

    <div class="flex items-center space-x-3 mb-6">
      <div class="text-gray-500">Количество замесов:</div>
      <button
        class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
        type="button"
        @click="setNumOfBatches(-1)"
      >
        <MinusIcon />
      </button>
      <div>
        <input
          type="number"
          v-model="numberOfBatches"
          id="first_product"
          class="bg-gray-50 w-[5rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#7000FF] focus:border-[#7000FF] block px-2.5 py-1"
          placeholder=" "
          required
        />
      </div>
      <button
        class="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
        type="button"
        @click="setNumOfBatches(1)"
      >
        <PlusIcon />
      </button>
    </div>
  </div>

  <div class="flex flex-col">
    <div 
        v-for="item, index in numberOfBatches"
        :key="index" 
        class="relative z-0 mb-6 w-2/5 mr-2 group"
    >
      <input
        type="number"
        name="floating_batch"
        id="floating_batch"
        v-model="batches[index]"
        class="min-w-[10rem] px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
        placeholder=" "
        required
      />
      <label
        for="floating_batch"
        class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >Замес {{ item }} (кг)</label
      >
    </div>
  </div>
</template>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
