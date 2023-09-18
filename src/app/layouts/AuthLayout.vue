<template>
  <div class="flex flex-col gap-y-4 justify-center h-[100vh] pb-32">
    <div class="w-96 self-center text-center text-3xl font-bold leading-9 my-8">
        AgroPremix Dashboard
    </div>
    <div class="w-96 self-center">
      <label
        for="username"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Username:
      </label>
      <input
        type="text"
        id="username"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#7000FF] focus:border-[#7000FF] block w-full p-2.5"
        required
      />
    </div>
    <div class="w-96 self-center">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password:
      </label>
      <input
        type="password"
        id="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#7000FF] focus:border-[#7000FF] block w-full p-2.5"
        required
      />
    </div>
    <div class="w-96 self-center text-end mt-8">
      <RouterLink
        to="/"
        class="text-white bg-[#7000FF] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
      >
        Войти
      </RouterLink>
    </div>
  </div>
</template>
