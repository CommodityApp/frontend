<script setup lang="ts">
import { computed, ref, watch } from "vue";
import LoaderOverlay from "@/app/components/LoaderOverlay.vue";

const props = defineProps<{
  isLoading: boolean;
  singleRation: any;
  queryType: any;
  rawsData: any;
  receiptsData: any;
}>();
const selectedRecipt = ref();

const emit = defineEmits<{
  onSaveRation: [priceData: any];
}>();

const visibleAlert = ref<boolean>();
const code = ref<string>();
const name = ref<string>();
const unit = ref<string>();

const rate = ref<number>();
const producer_name = ref<string>();
const receipt = ref<any>();

const ration_raws = ref([
  {
    raw_id: null,
    ratio: null,
  },
]);

const removeRawInput = () => {
  ration_raws.value.pop();
};
const addRawInput = () => {
  ration_raws.value.push({
    raw_id: null,
    ratio: null,
  });
};

const saveRation = () => {
  let newRation = {
    name: name.value,
    code: code.value,
    unit: unit.value,
    rate: rate.value,
    producer_name: producer_name.value,
    receipt_id: receipt.value[0],
    ration_raws: ration_raws.value.filter((item) => {
      return item.raw_id !== null;
    }),
  };
  emit("onSaveRation", newRation);
};

watch(
  () => props.singleRation,
  () => {
    if (props.singleRation.code) {
      //props.queryType is a case when it is duplcating...
      code.value = props.queryType ? null : props.singleRation.code;
      name.value = props.queryType ? null : props.singleRation.name;
      unit.value = props.singleRation.unit;
      rate.value = props.singleRation.rate;
      producer_name.value = props.singleRation.producer_name;
      receipt.value = [
        props.singleRation?.receipt?.id,
        props.singleRation?.receipt?.rate,
        props.singleRation?.receipt?.name,
      ];

      props.singleRation.ration_raws.forEach((item) => {
        ration_raws.value.push({
          raw_id: item.raw.id,
          ratio: parseFloat(item.ratio) as any,
        });
      });
    }
    //clearing null value
    ration_raws.value.shift();
  },
  {
    deep: true,
  }
);

const isEdit = computed(() => {
  return props.singleRation?.code != null && !props.queryType ? true : false;
});

const calculatedRate = computed(() => {
  const sumRatio = ration_raws.value.reduce((acc, item) => {
    return (acc = acc + (item.ratio == "" ? 0 : item.ratio));
  }, 0);
  const selectedReceiptRatio = receipt.value ? Number(receipt?.value[1]) : 0;

  return (sumRatio + selectedReceiptRatio).toPrecision(5);
});
</script>
<template>
  <div class="flex flex-row justify-between py-2 w-full">
    <div class="self-center text-2xl font-bold leading-7">
      <span v-if="isEdit">Редактировать</span>
      <span v-else-if="queryType">Дублировать</span>
      <span v-else>Добавить</span>
      Рацион
    </div>
    <div>
      <button
        :disabled="visibleAlert"
        @click="saveRation()"
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
          <label
            for="receipts"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Рецепт
          </label>
          <select
            v-focus
            v-model="receipt"
            ref="selectedRecipt"
            id="receipts"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          >
            <option></option>
            <option
              v-for="(receipt, index) in receiptsData"
              :key="index"
              :value="[receipt?.id, receipt?.rate, receipt?.name]"
            >
              {{ receipt.name }} - ({{ receipt.rate }}%)
            </option>
          </select>
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
            >Название</label
          >
        </div>
        <div class="relative z-0 w-full group">
          <input
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
            >Код</label
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

        <!-- <div class="relative z-0 w-full group">
          <input
            type="number"
            name="rate"
            id="rate"
            v-model="rate"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="rate"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Rate</label
          >
        </div> -->

        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="producer_name"
            id="producer_name"
            v-model="producer_name"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="producer_name"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Имя производителя</label
          >
        </div>
      </div>
    </form>

    <!-- <hr class="h-px my-8 bg-gray-200 border-0" /> -->
    <div class="inline-flex items-center justify-center mt-4 w-full">
      <hr class="w-full h-px my-8 bg-gray-200 border-0" />
      <span
        class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-[200px]"
      >
        Рационы
        <span
          class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded border border-indigo-200"
        >
          Общий процент: {{ calculatedRate }}%
        </span>
      </span>
    </div>

    <div class="relative z-0 w-[66%] group">
      <label
        for="receipts"
        class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >Рецепт
      </label>
      <select
        disabled
        v-focus
        v-model="receipt"
        ref="selectedRecipt"
        id="receipts"
        class="block cursor-not-allowed px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
      >
        <option
          v-for="(receipt, index) in receiptsData"
          :key="index"
          :value="[receipt.id, receipt.rate, receipt.name]"
        >
          {{ receipt.name }} - ({{ receipt.rate }}%)
        </option>
      </select>
    </div>

    <div
      v-for="(_, index) in ration_raws"
      class="grid md:grid-cols-3 md:gap-6 my-6"
    >
      <div class="relative z-0 w-full group">
        <label
          :for="`raw${index}`"
          class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Сырье
        </label>

        <select
          v-model="ration_raws[index]['raw_id']"
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
          v-model="ration_raws[index]['ratio']"
          :class="{ 'border-red-700': visibleAlert }"
          class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
          placeholder=" "
        />
        <label
          :for="`unit_ratio${index}`"
          :class="{ 'text-red-700': visibleAlert }"
          class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Соотношение
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
        v-if="ration_raws.length"
        @click="removeRawInput()"
        class="mt-4 text-[#F93D3D] ml-2 hover:text-white hover:bg-[#F93D3D] border border-[#F93D3D] text-sm py-[0.5rem] px-[0.9rem] rounded-[0.8rem]"
      >
        Удалить
      </button>
    </div>
  </div>
</template>
