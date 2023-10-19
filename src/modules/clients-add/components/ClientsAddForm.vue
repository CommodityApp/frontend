<script setup lang="ts">
import { computed, ref, watch } from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import LoaderOverlay from "@/app/components/LoaderOverlay.vue";

const props = defineProps<{
  isLoading: any
  saveClient: any
  updateClient: any
  clientsData: any
  getCountries: any,
  countriesData: any,
}>();

const name = ref("");
const industry = ref();
const region = ref();
const company = ref();
const country = ref();

watch(
  () => props.clientsData,
  () => {
    // console.log('test', props.clientsData?.country?.id)
    if (props.clientsData?.name) {
      name.value = props.clientsData?.name;
      industry.value = props.clientsData?.industry;
      region.value = props.clientsData?.region;
      company.value = props.clientsData.company;
      country.value = props.clientsData?.country;    
    }
  },
  {
    deep: true,
  }
);

const isEnabled = computed(() => {
  return name.value.trim().length;
});

const isEdited = computed(() => {
  return !!props.clientsData?.name;
});

const saveEditRaw = () => {
  const clientsData = {
    name: name.value,
    industry: industry.value,
    region: region.value, 
    company: company.value,
    country_id: country.value.id,
  }
  isEdited.value ? props.updateClient(clientsData) : props.saveClient(clientsData);
};
</script>
<template>
  <div class="flex flex-row justify-between py-2 w-full">
    <div class="self-center text-2xl font-bold leading-7">
      <span v-if="isEdited"> Изменить </span>
      <span v-else> Создать новыю </span>
      Клиент
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
    class="relative h-screen overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6"
  >
    <form>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="name"
            v-model="name"
            id="name"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="name"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Hазвание</label
          >
        </div>

        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="industry"
            v-model="industry"
            id="industry"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="industry"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Промышленность</label
          >
        </div>

        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="region"
            v-model="region"
            id="region"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="region"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Регион</label
          >
        </div>

        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="company"
            v-model="company"
            id="company"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="company"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Компания</label
          >
        </div>

        <div class="relative mb-16 z-0 w-full group">
          <v-select
          
            v-model="country"
            @input="getCountries($event.target.value)"
            :options="countriesData" 
            label="name">
              <template #no-options>
                <p class="text-gray-400">Страна не найдена</p>
              </template>
          </v-select>

          <label
            for="raw_type"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Страна
          </label>
          <!-- <select
            v-model="country"
            id="raw_type"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option>
              <input type="text"/>
            </option>
            <option  
              v-for="country, index in countriesData"
              :key="index"
              :value="country.id">
              {{ country.name }}
            </option>
          </select> -->
        </div>


      </div>
    </form>
  </div>
</template>