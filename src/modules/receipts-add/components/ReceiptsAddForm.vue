<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { WarningIcon } from "@/app/assets/svg";
import LoaderOverlay from "@/app/components/LoaderOverlay.vue";

const props = defineProps<{
  isLoading: boolean;
  rawsData: any;
  singleReceipt: any;
  queryType: any;
  animalTypes: any;
}>();

const emit = defineEmits<{
  onSaveReceipt: [receiptData: any];
}>();

const visibleAlert = ref<boolean>();
const rate = ref<number>();
const code = ref<string>();
const name = ref<string>();
const unit = ref<string>();
const producer_name = ref<string>();
const concentration = ref<number>();
const selectedAnimalTypes = ref({});
const animal_type_id = ref<number>();
const receipt_raws = ref([
  {
    raw_id: null,
    ratio: null,
  },
]);

const removeRawInput = () => {
  receipt_raws.value.pop();
};
const addRawInput = () => {
  receipt_raws.value.push({
    raw_id: null,
    ratio: null,
  });
};

const saveReceipt = () => {
  let newReceipt = {
    name: name.value,
    rate: rate.value,
    code: code.value,
    unit: unit.value,
    animal_type_id: animal_type_id.value,
    producer_name: producer_name.value,
    concentration: concentration.value,
    receipt_raws: receipt_raws.value.filter((item) => {
      return item.raw_id !== null;
    }),
  };
  emit("onSaveReceipt", newReceipt);
};

const sumOfRatio = computed(() => {
  return receipt_raws.value
    .reduce((acc, item) => {
      return (acc = parseFloat(
        acc + (item.ratio == undefined ? 0 : item.ratio)
      ));
    }, 0)
    .toFixed(2);
});

watch(
  () => receipt_raws,
  () => {
    sumOfRatio.value != concentration.value
      ? (visibleAlert.value = true)
      : (visibleAlert.value = false);
  },
  {
    deep: true,
  }
);

watch(
  () => props.singleReceipt,
  () => {
    if (props.singleReceipt.code) {
      code.value = props.singleReceipt.code;
      name.value = props.singleReceipt.name;
      rate.value = props.singleReceipt.rate;
      unit.value = props.singleReceipt.unit;
      selectedAnimalTypes.value = props.singleReceipt.animal_type?.parent_id;
      animal_type_id.value = props.singleReceipt.animal_type?.id;
      producer_name.value = props.singleReceipt.producer_name;
      concentration.value = props.singleReceipt.concentration;

      props.singleReceipt.receipt_raws.forEach((item) => {
        receipt_raws.value.push({
          raw_id: item.raw?.id,
          ratio: parseFloat(item.ratio),
        });
      });
    }
    if (props.queryType) {
      code.value = null;
      name.value = null;
    }
    //clearing null value
    receipt_raws.value.shift();
  },
  {
    deep: true,
  }
);

watch(
  () => selectedAnimalTypes.value,
  () => {
    selectedAnimalTypes.value ? "" : (animal_type_id.value = null);
  }
);
const computedAnimalTypes = computed(() => {
  return props.animalTypes.filter((item) => {
    return item.id == selectedAnimalTypes.value;
  });
});

const isEdit = computed(() => {
  return props.singleReceipt?.code != null && !props.queryType ? true : false;
});
</script>
<template>
  <div class="flex flex-row justify-between py-2 w-full">
    <div class="self-center text-2xl font-bold leading-7">
      <span v-if="isEdit">Редактирование</span>
      <span v-else-if="queryType">Дублирование</span>
      <span v-else>Добавление</span>
      рецептуры
    </div>
    <div>
      <button
        :disabled="visibleAlert"
        @click="saveReceipt()"
        class="flex flex-row bg-[#7000FF] disabled:bg-[#6f00ff41] cursor-pointer disabled:cursor-not-allowed text-white rounded-[1rem] py-[0.4rem] px-[0.9rem]"
      >
        <span v-if="isEdit">Изменить</span>
        <span v-else-if="queryType">Дублировать</span>
        <span v-else>Сохранить</span>
      </button>
    </div>
  </div>
  <LoaderOverlay v-if="isLoading" />
  <div
    v-else
    class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6"
  >
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
          />
          <label
            for="code"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Код рецепта</label
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
          />
          <label
            for="name"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Наименовение рецепта</label
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
          />
          <label
            for="unit"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Ед. измерения</label
          >
        </div>
        <div class="relative z-0 w-full group">
          <input
            type="number"
            name="rate"
            id="rate"
            v-model="rate"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
          />
          <label
            for="rate"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            <!-- Норма ввода -->
            Концентрация(%)
          </label>
        </div>

        <div class="relative z-0 w-full group">
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
              v-for="(animal, index) in animalTypes"
              :key="index"
              :value="animal.id"
            >
              {{ animal.name }} ( {{ animal.children.length }} )
            </option>
          </select>
        </div>

        <div class="relative z-0 w-full group">
          <label
            for="floating_animal_type"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Тип животных
          </label>

          <select
            :disabled="!selectedAnimalTypes"
            id="floating_animal_type"
            v-model="animal_type_id"
            class="block px-2.5 pb-2.5 pt-4 disabled:cursor-not-allowed disabled:border-red-200 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option></option>
            <option
              v-for="(selectedAnimal, index) in computedAnimalTypes[0]
                ?.children"
              :key="index"
              :value="selectedAnimal.id"
            >
              {{ selectedAnimal.name }}
            </option>
          </select>
        </div>

        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="producer"
            id="producer"
            v-model="producer_name"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
          />
          <label
            for="producer"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Производитель</label
          >
        </div>
        <div class="relative z-0 w-full group">
          <input
            type="number"
            name="concentration"
            id="concentration"
            v-model="concentration"
            :class="{ 'border-red-700': visibleAlert }"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
          />
          <label
            for="concentration"
            :class="{ 'text-red-700': visibleAlert }"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Норма ввода
          </label>
        </div>
      </div>
    </form>

    <!--  -->
    <div
      v-if="visibleAlert"
      class="flex mt-4 p-2 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      <WarningIcon class="w-4 h-4 self-center gap-2 mx-2" />
      <span>
        Cумма значений <u>Корма</u> должно быть равно <b>(=)</b> значения
        <u>Концентрации</u>.
        <br />
        <b>Калькуляция:</b> <i>(Корма)</i>
        <b>{{ sumOfRatio }} != {{ concentration }}</b> <i>(Концентрации)</i>
      </span>
    </div>
    <!-- <hr class="h-px my-8 bg-gray-200 border-0" /> -->
    <div class="inline-flex items-center justify-center mt-4 w-full">
      <hr class="w-full h-px my-8 bg-gray-200 border-0" />
      <span
        class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-[10%]"
      >
        Добавьте сырье
      </span>
    </div>

    <div
      v-for="(_, index) in receipt_raws"
      class="grid md:grid-cols-3 md:gap-6 my-6"
    >
      <div class="relative z-0 w-full group">
        <label
          :for="`raw${index}`"
          class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Сырье
        </label>

        <select
          v-model="receipt_raws[index]['raw_id']"
          id="`raw${index}`"
          class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
        >
          <option></option>
          <option v-for="(raw, index) in rawsData" :key="index" :value="raw.id">
            {{ raw.name }}
          </option>
        </select>
      </div>

      <div class="relative z-0 w-full group">
        <input
          type="number"
          name="unit_rato"
          :id="`unit_ratio${index}`"
          v-model="receipt_raws[index]['ratio']"
          :class="{ 'border-red-700': visibleAlert }"
          class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          placeholder=" "
        />
        <label
          :for="`unit_ratio${index}`"
          :class="{ 'text-red-700': visibleAlert }"
          class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Корма (кг/т)
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
        v-if="receipt_raws.length"
        @click="removeRawInput()"
        class="mt-4 text-[#F93D3D] ml-2 hover:text-white hover:bg-[#F93D3D] border border-[#F93D3D] text-sm py-[0.5rem] px-[0.9rem] rounded-[0.8rem]"
      >
        Удалить сырье
      </button>
    </div>
  </div>
</template>
