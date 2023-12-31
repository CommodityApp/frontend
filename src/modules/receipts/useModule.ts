import { ApiReceipts } from "@/shared/api";
import { onMounted, ref } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";

export default function useModule() {
  const isLoading = ref<boolean>(false);
  const receiptData = ref();
  const router = useRouter();
  const { notify } = useNotification();
  const metaData = ref();

  const getReceipts = async (page) => {
    try {
      isLoading.value = true;
      const data = await ApiReceipts.getReceipts(page);
      receiptData.value = data.data;
      metaData.value = data.meta;
    } catch (e: any) {
      // isLoading.value = false
      console.log("Error in receipts api: ", e);
    } finally {
      isLoading.value = false;
    }
  };
  const editReceipt = async (id) => {
    router.push({
      name: "receipts-add",
      query: {
        id,
      },
    });
  };
  const cloneReceipt = async (id, param) => {
    router.push({
      name: "receipts-add",
      query: {
        id,
        type: param,
      },
    });
  };

  const deleteReceipt = async (id) => {
    try {
      isLoading.value = true;
      await ApiReceipts.deleteReceipt(id).then(() => {
        notify({
          type: "success",
          title: "Рецепт успешно удалено!",
          speed: 500,
          duration: 1000,
        });
      });
    } catch (error: any) {
      console.log("Error in delete recipt api");
    } finally {
      isLoading.value = false;
      getReceipts(1);
    }
  };

  onMounted(() => {
    getReceipts(1);
  });

  return {
    isLoading,
    deleteReceipt,
    editReceipt,
    cloneReceipt,
    getReceipts,
    metaData,
    receiptData,
  };
}
