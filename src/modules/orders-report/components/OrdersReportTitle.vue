<script setup lang="ts">
import DeleteModal from "@/app/components/DeleteModal.vue";
import { ref } from "vue";
defineProps<{
  deleteOrder: any,
  editOrder: any
}>()
const deleteModalRef = ref(null);

const showModal = () => {
  deleteModalRef.value.showModal
}
</script>
<template>
  <div class="flex flex-row justify-between my-4">
    <div class="text-2xl font-bold leading-7 self-center">
      Документ на производство
    </div>
    <div class="flex flex-row gap-x-2 self-center">
      <button
        @click="editOrder"
        type="button"
        class="flex flex-row text-[#7000ff] hover:text-white hover:bg-[#7000ff] border border-[#7000ff] font-medium rounded-lg text-sm mt-4 px-4 py-2.5 text-center"
      >
        Изменить
      </button>
      <button
        data-modal-target="popup-modal" 
        data-modal-toggle="popup-modal"
        @click="showModal"
        type="button"
        class="flex flex-row text-[#F93D3D] hover:text-white hover:bg-[#F93D3D] border border-[#F93D3D] font-medium rounded-lg text-sm mt-4 px-4 py-2.5 text-center"
      >
        Удалить
      </button>
    </div>
  </div>

<DeleteModal 
  ref="deleteModalRef"
  :deleteMethod="deleteOrder"
   />
</template>
