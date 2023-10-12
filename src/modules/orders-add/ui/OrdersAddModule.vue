<script setup lang="ts">
import OrdersAddForm from "../components/OrdersAddForm.vue";
import Breadcrumb from "../../../app/components/Breadcrumb.vue";
import useModule from "../useModule";
const { clients, receipts, state, onSaveStateOrder } = useModule()

</script>
<template>
  <div class="flex flex-col my-10">
    <Breadcrumb />
    <OrdersAddForm 
      :clients="clients" 
      :receipts="receipts" 
      :state="state"
      @onSaveStateOrder="onSaveStateOrder"
    />
  </div>
</template>
