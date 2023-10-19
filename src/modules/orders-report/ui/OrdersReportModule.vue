<script setup lang="ts">
// import Breadcrumb from "../../../app/components/Breadcrumb.vue";
import OrdersReportTitle from "../components/OrdersReportTitle.vue";
import OrdersReportHeader from "../components/OrdersReportHeader.vue";
import OrdersReportTable from "../components/OrdersReportTable.vue";
import { PrintIcon } from "../../../app/assets/svg";
import LoaderOverlay from "@/app/components/LoaderOverlay.vue";

import useModule from "../useModule";

const { isLoading, selectedData, deleteOrder, editOrder } = useModule()

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
    <OrdersReportTitle 
      :deleteOrder="deleteOrder"
      :editOrder="editOrder" 
    />

    <LoaderOverlay v-if="isLoading" />
    <div v-else>
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
          :selectedPrice="selectedData?.price"
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
