<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{
  saveRaw: any;
  updateRaw: any;
  rawsData: any;
}>();

const raw_name = ref("");

watch(
  () => props.rawsData,
  () => {
    if (props.rawsData?.name) {
      raw_name.value = props.rawsData?.name;
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

const saveEditRaw = (raw_name) => {
  isEdited.value ? props.updateRaw(raw_name) : props.saveRaw(raw_name);
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
        @click="saveEditRaw(raw_name)"
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
      </div>
    </form>
  </div>
</template>
