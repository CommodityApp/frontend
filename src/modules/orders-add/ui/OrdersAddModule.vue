<script setup lang="ts">
import OrdersAddForm from "../components/OrdersAddForm.vue";
import Breadcrumb from "../../../app/components/Breadcrumb.vue";
import useModule from "../useModule";
const {} = useModule()

</script>
<template>
  <div class="flex flex-col my-10">
    <Breadcrumb />
    <OrdersAddForm />
  </div>
</template>
