<script setup lang="ts">
import Breadcrumb from "../../../app/components/Breadcrumb.vue";
import OrdersReportTitle from "../components/OrdersReportTitle.vue";
import OrdersReportHeader from "../components/OrdersReportHeader.vue";
import OrdersReportTable from "../components/OrdersReportTable.vue";
import { PrintIcon } from "../../../app/assets/svg";

const printSingleReport = (divName) => {
  let printContents = document.getElementById(divName).innerHTML;
  // let originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  print();
  // document.body.innerHTML = originalContents;
  location.reload();
};
</script>
<template>
  <div class="my-10">
    <Breadcrumb />
    <OrdersReportTitle />
    <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6">
      <OrdersReportHeader />
    </div>
    
    <OrdersReportTable id="printableArea" />
    <div class="flex flex-row justify-end">
      <button
        @click="printSingleReport('printableArea')"
        type="submit"
        class="flex flex-row text-[#7000ff] hover:text-white border border-[#7000ff] hover:bg-[#7000ff] font-medium rounded-lg text-sm mt-4 px-4 py-2.5 text-center"
      >
        <PrintIcon class="w-4 h-4 mx-1 self-center" />
        Печатать
      </button>
    </div>

    <OrdersReportTable id="printableArea" />
    <div class="flex flex-row justify-end">
      <button
        @click="printSingleReport('printableArea')"
        type="submit"
        class="flex flex-row text-[#7000ff] hover:text-white border border-[#7000ff] hover:bg-[#7000ff] font-medium rounded-lg text-sm mt-4 px-4 py-2.5 text-center"
      >
        <PrintIcon class="w-4 h-4 mx-1 self-center" />
        Печатать
      </button>
    </div>

  </div>
</template>
