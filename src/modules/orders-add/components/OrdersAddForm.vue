<script setup lang="ts">
import type { IClients, IReceipts, IAnimalTypes, IState } from "../types";
import { watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const router = useRouter()

const props = defineProps<{
  clients: IClients[],
  receipts: IReceipts[],
  animalTypes: any,
  state: IState
}>()

const emit = defineEmits<{
  onSaveStateOrder: [state: IState ]
}>()


watch(props.state.selectedAnimalTypes, () => {
  props.state.selectedAnimalTypes.value ? '' : props.state.animal_type_id = null
},
{
  deep: true
})


const computedAnimalTypes = computed(() => {
  return props.animalTypes.filter((item) => {
    return item.id == props.state.selectedAnimalTypes
  })
})

const goNextStep = async () => {
  const result = await v$.value.$validate()
  if(result){
    emit("onSaveStateOrder", props.state)
    router.push({
      path:'/orders/task',
      replace: true 
    })
  }
}

//Validations
const rules = {
  client_id: { required },
  date: { required },
  receipt: { required },
  amount: { required },
  selectedAnimalTypes: { required },
  animal_type_id: { required }

}
const v$ = useVuelidate(rules, props.state)
</script>
<template>
  <div class="text-2xl font-bold leading-7 my-4">Созданые новый заказ</div>
  <div
    class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6"
  >
    <form>
      <div class="grid md:grid-cols-2 md:gap-6">
       
        <div class="relative z-0 w-full mb-10 group">
          <label
            for="client"
            :class="{'text-red-700':v$.client_id.$errors.length}"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Клиент
          </label>
          <select 
            v-model="state.client_id"
            id="client"
            :class="{'border border-red-700':v$.client_id.$errors.length}"
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
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.client_id.$errors" 
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
        </div>

        <div class="relative z-1 w-full mb-10 group">
          <input
            v-model="state.date"
            type="date"
            name="date"
            id="date"
            :class="{'border border-red-700':v$.date.$errors.length}"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="date"
            :class="{'text-red-700':v$.date.$errors.length}"
            class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Дата
          </label>
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.date.$errors"
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
        </div>
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <!-- <code>
          {{ state.receipt }}
        </code> -->
        <div class="relative z-0 w-full mb-10 group">
          <label
            for="receipts"
            :class="{'text-red-700':v$.receipt.$errors.length}"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Рецепт
          </label>
          <select
            v-model="state.receipt"
            id="receipts"
            :class="{'border border-red-700':v$.receipt.$errors.length}"
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
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.client_id.$errors" 
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
        </div>
        
        <div class="relative z-0 w-full mb-10 group">
          <input
            type="number"
            name="amount"
            id="amount"
            v-model="state.amount"
            :class="{'border border-red-700':v$.amount.$errors.length}"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="amount"
            :class="{'text-red-700':v$.amount.$errors.length}"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Количество (кг)</label
          >
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.amount.$errors" 
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
        </div>
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        
        <div class="relative z-0 w-full mb-10 group">
          <label
            for="animal_types"
            :class="{'text-red-700':v$.selectedAnimalTypes.$errors.length}"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Вид животных
          </label>
          <select
            v-model="state.selectedAnimalTypes" 
            id="animal_types"
            :class="{'border border-red-700':v$.selectedAnimalTypes.$errors.length}"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option></option>
            <option 
              v-for="animal, index in animalTypes"
              :key="index"
              :value="animal.id"
            >
            {{animal.name}} ( {{animal.children.length}} )
          </option>
          </select>
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.selectedAnimalTypes.$errors" 
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
        </div>

        <div class="relative z-0 w-full mb-10 group">
          <label
            for="floating_animal_type"
            :class="{'text-red-700':v$.animal_type_id.$errors.length}"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Тип животных
          </label>
          
          <select
            :disabled="!state.selectedAnimalTypes"
            id="floating_animal_type"
            v-model="state.animal_type_id"
            :class="{'border border-red-700':v$.animal_type_id.$errors.length}"
            class="block px-2.5 pb-2.5 pt-4 disabled:cursor-not-allowed disabled:border-red-200 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option></option>
            <option 
              v-for="selectedAnimal, index in computedAnimalTypes[0]?.children"
              :key="index"
              :value="selectedAnimal.id"
              >
              {{selectedAnimal.name}}
            </option>
          </select>
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.animal_type_id.$errors" 
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
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
