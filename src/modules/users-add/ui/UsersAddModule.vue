<script setup lang="ts">
import UsersAddForm from "../components/UsersAddForm.vue";
import useModule from "../useModule";

const { isLoading,
        saveUser,
        updateUser,
        usersData } = useModule();
</script>
<template>
  <div class="flex flex-col my-10">
    <UsersAddForm
      :isLoading="isLoading"
      :saveUser="saveUser"
      :updateUser="updateUser"
      :usersData="usersData"
    />
  </div>
</template>
