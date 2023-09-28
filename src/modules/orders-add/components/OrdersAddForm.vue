<script setup lang="ts">
import { IClients, IReceipts, IAnimalTypes, IState } from "../types";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router"

const props = defineProps<{
  clients: IClients[],
  receipts: IReceipts[],
  animalTypes: IAnimalTypes[],
  state: IState
}>()

const emit = defineEmits<{
  onSaveStateOrder: [state: IState ]
}>()

const selectedAnimalTypes = ref<IAnimalTypes[]>([])
watch(selectedAnimalTypes, () => {
  selectedAnimalTypes.value.children.length ? '' : props.state.animal_type_id = null
},
{
  deep: true
})

const router = useRouter()
const goNextStep = () => {
  emit("onSaveStateOrder", props.state)
  router.push({
    path:'/orders/task',
    replace: true 
  })
  // router.push('/orders/task')
}

</script>
<template>
  <div class="text-2xl font-bold leading-7 my-4">Созданые новый заказ</div>
  <div
    class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6"
  >
    <form>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <label
            for="client"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Клиент
          </label>
          <select 
            v-model="state.client_id"
            id="client"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option></option>
            <option  
              v-for="client, index in clients"
              :key="index"
              :value="client.id">
              {{ client.name }}
            </option>
          </select>
        </div>
        <div class="relative z-1 w-full mb-6 group">
          <input
            v-model="state.date"
            type="date"
            name="date"
            id="date"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="date"
            class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Дата
          </label>
        </div>
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <label
            for="receipts"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Рецепт
          </label>
          <select
            v-model="state.receipt" 
            id="receipts"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option></option>
            <option  
              v-for="receipt, index in receipts"
              :key="index"
              :value="receipt">
              {{ receipt.name }}
            </option>
          </select>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="amount"
            id="amount"
            v-model="state.amount"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="amount"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Количество (кг)</label
          >
        </div>
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <label
            for="animal_types"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Вид животных
          </label>
          <select
            v-model="selectedAnimalTypes" 
            id="animal_types"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option></option>
            <option 
              v-for="animal, index in animalTypes"
              :key="index"
              :value="animal"
            >
            {{animal.name}} ( {{animal.children.length}} )
          </option>
          </select>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <label
            for="floating_animal_type"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Тип животных
          </label>
          <select
            :disabled="!selectedAnimalTypes?.children?.length"
            id="floating_animal_type"
            v-model="state.animal_type_id"
            class="block px-2.5 pb-2.5 pt-4 disabled:cursor-not-allowed disabled:border-red-200 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option 
              v-for="selectedAnimal, index in selectedAnimalTypes.children"
              :key="index"
              :value="selectedAnimal.id"
              >
              {{selectedAnimal.name}}
            </option>
          </select>
        </div>
      </div>
    </form>

    <div class="flex justify-end mt-8">
      <button
        @click="goNextStep()"
        class="text-[#7000ff] bg-[#F3F4F6] hover:bg-[#cfb7efb7] font-medium rounded-lg text-sm px-5 py-2.5 mt-4 text-center"
      >
        Далее
    </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.red-color {
  color: red;
}
</style>
