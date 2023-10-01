<script setup lang="ts">
import UsersHeader from "../components/UsersHeader.vue";
import UsersTable from "../components/UsersTable.vue";

import useModule from "../useModule";

const { isLoading, usersData } = useModule()
</script>
<template>
    <UsersHeader />
    <UsersTable 
        :isLoading="isLoading"
        :usersData="usersData" 
    />
</template>