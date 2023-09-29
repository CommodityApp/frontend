<script setup lang="ts">
import ReceiptsAddForm from '../components/ReceiptsAddForm.vue';
import useModule from '../useModule';

const { isLoading, rawsData, singleReceipt, onSaveReceipt } = useModule()
</script>
<template>
    <div class="flex flex-col my-10">
        <ReceiptsAddForm
            :isLoading="isLoading" 
            :rawsData="rawsData"
            :singleReceipt="singleReceipt"
            @onSaveReceipt="onSaveReceipt"
        />
    </div>
</template>