<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{
  saveRaw: any
  updateRaw: any
  rawsData: any
  rawTypes: any
  producers: any
  bunkers: any
}>();

const raw_name = ref("");
const code = ref();
const unit = ref();
const concentration = ref();
const raw_type_id = ref();
const producer_id = ref();
const bunker_id = ref();
const description = ref();

watch(
  () => props.rawsData,
  () => {
    if (props.rawsData?.name) {
      raw_name.value = props.rawsData?.name;
      code.value = props.rawsData?.code;
      unit.value = props.rawsData?.unit;
      raw_type_id.value = props.rawsData.raw_type?.id
      concentration.value = props.rawsData?.concentration;
      producer_id.value = props.rawsData?.producer?.id
      bunker_id.value = props.rawsData?.bunker?.id
      description.value = props.rawsData.description
      
    }
  },
  {
    deep: true,
  }
);

const isEnabled = computed(() => {
  return raw_name.value.trim().length;
});

const isEdited = computed(() => {
  return !!props.rawsData?.name;
});

const saveEditRaw = () => {
  const rawsData = {
      raw_name: raw_name.value,
      code: code.value,
      unit: unit.value, 
      raw_type_id: raw_type_id.value,
      concentration: null,
      producer_id: producer_id.value, 
      bunker_id: bunker_id.value,
      description: description.value
  }
  isEdited.value ? props.updateRaw(rawsData) : props.saveRaw(rawsData);
};
</script>
<template>
  <div class="flex flex-row justify-between py-2 w-full">
    <div class="self-center text-2xl font-bold leading-7">
      <span v-if="isEdited"> Изменить </span>
      <span v-else> Создать новыю </span>
      Cырьё
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

  <div
    class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6"
  >
    <form>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="raw_name"
            v-model="raw_name"
            id="raw_name"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="raw_name"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Hазвание сырья</label
          >
        </div>

        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="code"
            v-model="code"
            id="code"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="code"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Код</label
          >
        </div>

        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="unit"
            v-model="unit"
            id="unit"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="unit"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Единица</label
          >
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

        <div class="relative z-0 w-full group">
          <label
            for="raw_type"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Тип Сырья
          </label>
          <select
            v-model="raw_type_id"
            id="raw_type"
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
        </div>

        <div class="relative z-0 w-full group">
          <label
            for="producer"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Производитель
          </label>
          <select
            v-model="producer_id"
            id="producer"
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
        </div>
        <div class="relative z-0 w-full group">
          <label
            for="bunker"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Бункер
          </label>
          <select
            v-model="bunker_id"
            id="bunker"
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
        </div>

        <div class="relative z-0 w-full group">
          <textarea
            type="text"
            name="description"
            v-model="description"
            id="description"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="description"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Описание</label
          >
        </div>

      </div>
    </form>
  </div>
</template>
