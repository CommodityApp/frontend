import { onMounted, ref } from "vue";
import { ApiPrices } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";

export default function useModule() {
  const priceData = ref();
  const isLoading = ref<boolean>(false);
  const { notify } = useNotification();
  const router = useRouter();
  const metaData = ref();

  const getPrices = async (page) => {
    try {
      isLoading.value = true;
      const data = await ApiPrices.getPrices(page);

      priceData.value = data.data;
      metaData.value = data.meta;
    } catch (error: any) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const deletePrice = async (id) => {
    try {
      isLoading.value = true;
      await ApiPrices.deletePrice(id).then(() => {
        notify({
          type: "success",
          title: "Прейскурант успешно удалено!",
          speed: 500,
          duration: 1000,
        });
      });
    } catch (error: any) {
      console.log("error delete price api:", error);
    } finally {
      isLoading.value = false;
      getPrices(1);
    }
  };
  const editPrice = (id) => {
    router.push({
      name: "prices-add",
      query: {
        id,
      },
    });
  };
  const clonePrice = (id, param) => {
    router.push({
      name: "prices-add",
      query: {
        id,
        type: param,
      },
    });
  };

  onMounted(() => {
    getPrices(1);
  });
  return {
    isLoading,
    priceData,
    metaData,
    deletePrice,
    editPrice,
    getPrices,
    clonePrice,
  };
}
