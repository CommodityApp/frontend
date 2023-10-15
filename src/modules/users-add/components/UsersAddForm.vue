<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{
  isLoading: any
  saveUser: any
  updateUser: any
  usersData: any
}>();

const name = ref();
const email = ref();
const password = ref('');

watch(
  () => props.usersData,
  () => {
    if (props.usersData?.name) {
      name.value = props.usersData?.name;
      email.value = props.usersData?.email;
      password.value = props.usersData?.password;   
    }
  },
  {
    deep: true,
  }
);

const isEnabled = computed(() => {
  return name.value?.trim().length && password.value?.trim().length;
});

const isEdited = computed(() => {
  return !!props.usersData?.name;
});

const saveEditRaw = () => {
  const usersData = {
    name: name.value,
    email: email.value,
    password: password.value
  }
  isEdited.value ? props.updateUser(usersData) : props.saveUser(usersData);
};
</script>
<template>
  <div class="flex flex-row justify-between py-2 w-full">
    <div class="self-center text-2xl font-bold leading-7">
      <span v-if="isEdited"> Изменить </span>
      <span v-else> Создать новыю </span>
      Пользователь
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
            name="email"
            v-model="email"
            id="email"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="email"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Электронная почта</label
          >
        </div>

        <div class="relative z-0 w-full group">
          <input
            type="text"
            name="password"
            v-model="password"
            id="password"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-[#7000FF] peer"
            placeholder=" "
            required
          />
          <label
            for="password"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-[#7000FF] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >Новый пароль</label
          >
        </div>
      </div>
    </form>
  </div>
</template>