<script setup lang="ts">
import UsersHeader from "../components/UsersHeader.vue";
import UsersTable from "../components/UsersTable.vue";

import useModule from "../useModule";

const { isLoading, usersData, metaData, deleteUser, editUser, getUsers } =
  useModule();
</script>
<template>
  <UsersHeader />
  <UsersTable
    :isLoading="isLoading"
    :usersData="usersData"
    :deleteUser="deleteUser"
    :editUser="editUser"
    :metaData="metaData"
    :getUsers="getUsers"
  />
</template>
