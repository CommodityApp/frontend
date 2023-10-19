<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import LoaderOverlay from "@/app/components/LoaderOverlay.vue";

const props = defineProps<{
  isLoading: any
  saveRaw: any
  updateRaw: any
  rawsData: any
  rawTypes: any
  producers: any
  bunkers: any
}>();

const state = reactive({
  raw_name: '', 
  code: '',
  unit: '',
  concentration: '', 
  raw_type_id: '',
  producer_id: '',
  bunker_id: '',
  description: ''
})

watch(
  () => props.rawsData,
  () => {
    if (props.rawsData?.name) {
      state.raw_name = props.rawsData?.name;
      state.code = props.rawsData?.code;
      state.unit = props.rawsData?.unit;
      state.raw_type_id = props.rawsData.raw_type?.id
      state.concentration = props.rawsData?.concentration
      state.producer_id = props.rawsData?.producer?.id
      state.bunker_id = props.rawsData?.bunker?.id
      state.description = props.rawsData.description
      
    }
  },
  {
    deep: true,
  }
);

const isEnabled = computed(() => {
  return state.raw_name.trim().length;
});

const isEdited = computed(() => {
  return !!props.rawsData?.name;
});

const saveEditRaw = async () => {
  const rawsData = {
      raw_name: state.raw_name,
      code: state.code,
      unit: state.unit, 
      raw_type_id: state.raw_type_id,
      concentration: null,
      producer_id: state.producer_id, 
      bunker_id: state.bunker_id,
      description: state.description
  }
  const result = await v$.value.$validate()
  if(result){
    isEdited.value ? props.updateRaw(rawsData) : props.saveRaw(rawsData);
  }
};

//Validations
const rules = {
  raw_name: { required },
  code: { required },
  unit: { required },
  raw_type_id: { required },
  producer_id: { required },
  bunker_id: { required },
  description: { required },

}
const v$ = useVuelidate(rules, state)
</script>
<template>
  <div class="flex flex-row justify-between py-2 w-full">
    <div class="self-center text-2xl font-bold leading-7">
      <span v-if="isEdited">Редактировать </span>
      <span v-else>Добавить </span>
      Сырье
    </div>

    <div>
      <button
        :disabled="!isEnabled"
        @click="saveEditRaw()"
        class="flex flex-row bg-[#7000FF] disabled:bg-[#6f00ff41] cursor-pointer disabled:cursor-not-allowed text-white rounded-[1rem] py-[0.4rem] px-[0.9rem]"
      >
        <span v-if="isEdited">Изменить</span>
        <span v-else>Сохранить</span>
      </button>
    </div>
  </div>

  <LoaderOverlay v-if="isLoading" />
  <div v-else
    class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6"
  >
    <form>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="raw_name"
            v-model="state.raw_name"
            id="raw_name"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="raw_name"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Hазвание сырья</label
          >
        </div>

        <div class="relative z-0 mb-1 w-full group">
          <input
            type="text"
            name="code"
            v-model="state.code"
            id="code"
            :class="{'border border-red-700': v$.code.$errors.length}"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="code"
            :class="{'text-red-700':v$.code.$errors.length}"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Код</label
          >
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.code.$errors" 
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
        </div>

        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="unit"
            v-model="state.unit"
            id="unit"
            :class="{'border border-red-700': v$.code.$errors.length}"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="unit"
            :class="{'text-red-700': v$.code.$errors.length}"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Единица</label
          >
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.unit.$errors" 
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
        </div>

        <!-- <div class="relative z-0 w-full group">
          <input
            type="number"
            name="concentration"
            v-model="concentration"
            id="concentration"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="concentration"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Концентрация</label
          >
        </div> -->

        <div class="relative z-0 w-full mb-1 group">
          <label
            for="raw_type"
            :class="{'text-red-700': v$.code.$errors.length}"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Тип Сырья
          </label>
          <select
            v-model="state.raw_type_id"
            id="raw_type"
            :class="{'border border-red-700': v$.code.$errors.length}"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option></option>
            <option  
              v-for="rawType, index in rawTypes"
              :key="index"
              :value="rawType.id">
              {{ rawType.name }}
            </option>
          </select>
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.raw_type_id.$errors" 
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
        </div>

        <div class="relative z-0 w-full group">
          <label
            for="producer"
            :class="{'text-red-700': v$.code.$errors.length}"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Производитель
          </label>
          <select
            v-model="state.producer_id"
            id="producer"
            :class="{'border border-red-700': v$.code.$errors.length}"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option></option>
            <option  
              v-for="producer, index in producers"
              :key="index"
              :value="producer.id">
              {{ producer.name }}
            </option>
          </select>
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.producer_id.$errors" 
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
        </div>
        <div class="relative z-0 mb-1 w-full group">
          <label
            for="bunker"
            :class="{'text-red-700': v$.code.$errors.length}"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Бункер
          </label>
          <select
            v-model="state.bunker_id"
            id="bunker"
            :class="{'border border-red-700': v$.code.$errors.length}"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option></option>
            <option  
              v-for="bunker, index in bunkers"
              :key="index"
              :value="bunker.id">
              {{ bunker.name }}
            </option>
          </select>
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.bunker_id.$errors" 
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
        </div>

        <div class="relative z-0 w-full group">
          <textarea
            type="text"
            name="description"
            v-model="state.description"
            id="description"
            :class="{'border border-red-700': v$.code.$errors.length}"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="description"
            :class="{'text-red-700': v$.code.$errors.length}"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Описание</label
          >
          <span 
            class="absolute pt-1 text-[0.7rem] text-red-700" 
            v-for="error in v$.description.$errors" 
            :key="error.$uid"
          >
            <span class="ml-1">Поле не может быть пустым.</span>
          </span>
        </div>

      </div>
    </form>
  </div>
</template>
