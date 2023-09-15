<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import AsideMenu from "../components/AsideMenu.vue";
</script>
<template>
  <Navbar />
  <AsideMenu />
  
  <div class="p-4 sm:ml-64 bg-[#F3F4F6] min-h-screen">
    <div class="p-4 rounded-lg">
        <router-view />
    </div>
  </div>

</template>
