<script setup lang="ts">
import { ref } from "vue";
import useLogin from "./useLogin";
import { InfoIcon } from "../../app/assets/svg";
const email = ref<string>();
const password = ref<string>();

const { login, errorMsg } = useLogin();
const Authenticate = (email, password) => {
  login(email, password);
};
</script>
<template>
  <div class="flex flex-col gap-y-4 justify-center h-[100vh] pb-32">
    <div class="w-96 self-center text-center text-3xl font-bold leading-9 my-8">
      AgroPremix Dashboard
    </div>

    <div
      v-if="errorMsg?.length"
      class="w-[26rem] self-center p-4 mb-4 text-sm text-[#F84343] rounded-lg bg-red-50"
      role="alert"
    >
      <InfoIcon />
      {{ errorMsg }}
    </div>

    <div class="w-96 self-center">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Электронная почта:
      </label>
      <input
        v-focus
        type="text"
        id="email"
        v-model="email"
        @keyup.enter="Authenticate(email, password)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#7000FF] focus:border-[#7000FF] block w-full p-2.5"
        required
      />
    </div>
    <div class="w-96 self-center">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Пароль:
      </label>
      <input
        type="password"
        id="password"
        v-model="password"
        @keyup.enter="Authenticate(email, password)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#7000FF] focus:border-[#7000FF] block w-full p-2.5"
        required
      />
    </div>
    <div class="w-96 self-center text-end mt-8">
      <button
        @click="Authenticate(email, password)"
        class="text-white bg-[#7000FF] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
      >
        Войти
      </button>
    </div>
  </div>
</template>
