<script setup lang="ts">
import Breadcrumb from "../../../app/components/Breadcrumb.vue";
import OrdersReportTitle from "../components/OrdersReportTitle.vue";
import OrdersReportHeader from "../components/OrdersReportHeader.vue";
import OrdersReportTable from "../components/OrdersReportTable.vue";
import { PrintIcon } from "../../../app/assets/svg";

import useModule from "../useModule";

const { selectedData } = useModule()

const printSingleReport = (divName) => {
  let printContents = document.getElementById(divName).innerHTML;
  document.body.innerHTML = printContents;
  print();
  location.reload();
};
</script>
<template>
  <div class="my-10">
    <!-- <Breadcrumb /> -->
    <OrdersReportTitle />
    <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg px-5 py-6">
      <OrdersReportHeader 
        :selectedData="selectedData"
      />
    </div>
    
    <div 
      v-for="selectedBatch, index in selectedData?.batch_inputs"
      :index="index"
    >
      <OrdersReportTable 
        :id="`printableArea${index}`"
        :index="index" 
        :selectedBatch="selectedBatch"
        :selectedReceipt="selectedData?.receipt"
        :selectedOrder="selectedData?.order_calculated_raws"
        :selectedOveralAmountError="selectedData?.calculated_amount_with_error"
        :selectedOveralAmount="selectedData?.calculated_amount"
      />

      <div class="flex flex-row justify-end">
        <button
          @click="printSingleReport(`printableArea${index}`)"
          type="submit"
          class="flex flex-row text-[#7000ff] hover:text-white border border-[#7000ff] hover:bg-[#7000ff] font-medium rounded-lg text-sm mt-4 px-4 py-2.5 text-center"
        >
          <PrintIcon class="w-4 h-4 mx-1 self-center" />
          Печатать
        </button>
      </div>
    </div>

    <!-- <OrdersReportTable id="printableArea" />
    <div class="flex flex-row justify-end">
      <button
        @click="printSingleReport('printableArea')"
        type="submit"
        class="flex flex-row text-[#7000ff] hover:text-white border border-[#7000ff] hover:bg-[#7000ff] font-medium rounded-lg text-sm mt-4 px-4 py-2.5 text-center"
      >
        <PrintIcon class="w-4 h-4 mx-1 self-center" />
        Печатать
      </button>
    </div> -->

  </div>
</template>
