<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { WarningIcon } from "../../../app/assets/svg";

const props = defineProps<{
  isLoading: boolean,
  singlePrice: any,
  queryType: any,
  rawsData: any
}>()

const emit = defineEmits<{
  onSavePrice: [priceData: any]
}>()

const visibleAlert = ref<boolean>()
const code = ref<string>()
const name = ref<string>()
const unit = ref<string>()
const price_raws = ref([
  {
    raw_id:null, 
    price:null
  }
])

const removeRawInput = () => {
    price_raws.value.pop()
}
const addRawInput = () => {
    console.log(price_raws.value)
    price_raws.value.push({
    raw_id: null,
    price: null
  })
}

const savePrice = () => {
  let newPrice = {
    name: name.value,
    code: code.value,
    unit: unit.value,
    price_raws: price_raws.value.filter((item) => {return item.raw !== null})
  }
  emit("onSavePrice", newPrice)
}

// const sumOfRatio = computed(() => {
//   return price_raws.value.reduce((acc, item) => {
//     return acc = parseFloat(acc + (item.ratio == undefined ? 0 : item.ratio))
//   }, 0)
// })

// watch(receipt_raws, () => {
//   sumOfRatio.value != concentration.value ? visibleAlert.value = true : visibleAlert.value = false
// },{
//   deep: true
// })

watch(() => props.singlePrice, () => {
  if( props.singlePrice.code ){
    code.value = props.singlePrice.code 
    name.value = props.singlePrice.name
    unit.value = props.singlePrice.unit
    
    props.singlePrice.price_raws.forEach((item) => {
        price_raws.value.push({
        raw_id: item.raw.id,
        price: parseFloat(item.price)
      })
    })
  }
//   if(props.queryType) {
//     // console.log('here ', props.queryType)
    
//     name.value = null
//   }
  //clearing null value
  price_raws.value.shift()
}, {
  deep: true
})

const isEdit = computed(() => {
  return props.singlePrice?.code != null && !props.queryType ? true : false
})

</script>
<template>
  <div class="flex flex-row justify-between py-2 w-full">
    <div class="self-center text-2xl font-bold leading-7">
      <span v-if="isEdit">Изменить</span> 
      <span v-else-if="queryType">Дублирование</span>
      <span v-else>Создать новыю</span>
      прейскурант
    </div>
    <div>
      <button
        :disabled="visibleAlert"
        @click="savePrice()"
        class="flex flex-row bg-[#7000FF] disabled:bg-[#6f00ff41] cursor-pointer disabled:cursor-not-allowed text-white rounded-[1rem] py-[0.4rem] px-[0.9rem]"
      >
      <span v-if="isEdit">Изменить</span>
      <span v-else-if="queryType">Дублировать</span>
      <span v-else>Сохранить</span>
    </button>
    </div>
  </div>

  <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6">
    <form>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full group">
          <input
            v-focus
            type="text"
            name="code"
            id="code"
            v-model="code"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="code"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Код прейскурант</label
          >
        </div>
        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="name"
            id="name"
            v-model="name"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="name"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Название прейскурант</label
          >
        </div>

        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="unit"
            id="unit"
            v-model="unit"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="unit"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Ед. измерения</label
          >
        </div>
        

      </div>
    </form>

    
    <!-- <hr class="h-px my-8 bg-gray-200 border-0" /> -->
    <div class="inline-flex items-center justify-center mt-4 w-full">
      <hr class="w-full h-px my-8 bg-gray-200 border-0">
      <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-[10%]">
        Цены cырые
      </span>
    </div>

<!-- <code>
    {{ singlePrice?.price_raws }}
</code> -->
    <div 
      v-for="_, index in price_raws" 
      class="grid md:grid-cols-3 md:gap-6 my-6"
    >
      <div class="relative z-0 w-full group">
          <label
          :for="`raw${index}`"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Сырье
          </label>
          
          <select 
            v-model="price_raws[index]['raw_id']"
            id="`raw${index}`"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option></option>
            <option  
              v-for="raw, index in rawsData"
              :key="index"
              :value="raw.id">
              {{ raw.name }}
            </option>
          </select>
        </div>

      <div class="relative z-0 w-full group">
        <input
          type="number"
          name="unit_rato"
          :id="`unit_ratio${index}`"
          v-model="price_raws[index]['price']"
          :class="{'border-red-700':visibleAlert}"
          class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          placeholder=" "
        />
        <label
          :for="`unit_ratio${index}`"
          :class="{'text-red-700':visibleAlert}"
          class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Price
        </label>
      </div>
      
    </div>

    <div>
      <button
        @click="addRawInput()"
        class="mt-4 text-[#7000FF] hover:text-white hover:bg-[#7000FF] border border-[#7000FF] text-sm py-[0.5rem] px-[0.9rem] rounded-[0.8rem]"
      >
        Добавить
      </button>

      <button
        v-if="price_raws.length"
        @click="removeRawInput()"
        class="mt-4 text-[#F93D3D] ml-2 hover:text-white hover:bg-[#F93D3D] border border-[#F93D3D] text-sm py-[0.5rem] px-[0.9rem] rounded-[0.8rem]"
      >
        Удалить сырье
      </button>
    </div>
  </div>
</template>
