<script setup lang="ts">
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { DeleteIcon, CloseModalIcon } from "@/app/assets/svg/index.jsx";
import { onMounted, ref } from 'vue';

const props = defineProps<{
  deleteMethod?: any
}>()

const modal = ref<ModalInterface>()

onMounted(() => {
   const $modalElement : HTMLElement = document.querySelector('#popup-modal') as any;
   const modalOptions: ModalOptions = {
    placement: 'bottom-right',
    backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40',
    closable: true,
}
 modal.value = new Modal($modalElement, modalOptions);

})

const confirmDelete = () => {
    props.deleteMethod()
    modal.value.hide()
}

const showModal = () => {
    modal.value.show()
}
defineExpose<{
    showModal:any
}>()
</script>
<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow">
        <button
          @click="modal.hide()"
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
          data-modal-hide="popup-modal"
        >
          <CloseModalIcon />
        </button>

        <div class="p-6 text-center">
          <div class="w-full flex justify-center my-2">
            <div class="bg-red-200 w-12 h-12 rounded-full flex justify-center">
              <DeleteIcon class="text-red-700 w-8 h-8 self-center" />
            </div>
          </div>
          <h3 class="mb-5 text-lg font-normal text-gray-900 dark:text-gray-400">
            Вы действительно хотите удалить?
          </h3>
          <button
            @click="confirmDelete"
            data-modal-hide="popup-modal"
            type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Да, удалить
          </button>
          <button
            @click="modal.hide()"
            data-modal-hide="popup-modal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
