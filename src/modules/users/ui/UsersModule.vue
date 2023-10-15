<script setup lang="ts">
import UsersHeader from "../components/UsersHeader.vue";
import UsersTable from "../components/UsersTable.vue";

import useModule from "../useModule";

const { isLoading, usersData, deleteUser, editUser } = useModule()
</script>
<template>
    <UsersHeader />
    <UsersTable 
        :isLoading="isLoading"
        :usersData="usersData" 
        :deleteUser="deleteUser"
        :editUser="editUser"
    />
</template>