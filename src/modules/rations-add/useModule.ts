import { ref, onMounted } from "vue";
import { ApiRations } from "@/shared/api";
import { ApiRaws, ApiReceipts } from "@/shared/api";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";

export default function useModule() {
  const isLoading = ref<boolean>(false);
  const { notify } = useNotification();
  const router = useRouter();
  const route = useRoute();
  const singleRation = ref([]);
  const rawsData = ref();
  const receiptsData = ref();
  const queryType = ref();

  const onSaveRation = async (price) => {
    try {
      // isLoading.value = true
      if (route.query.id && !queryType.value) {
        await ApiRations.updateRation(route.query.id, price).then(() => {
          notify({
            type: "success",
            title: "Успешно изминено!",
          });
        });
      } else {
        await ApiRations.saveRation(price).then(() => {
          notify({
            type: "success",
            title: "Успешно добавлено!",
          });
        });
      }
      router.replace("/rations");
    } catch (error: any) {
      // isLoading.value = false
      const errors = error?.response?.data.errors;

      Object.values(errors).forEach((item) => {
        notify({
          type: "error",
          title: "Ошибка!",
          text: item[0],
          speed: 500,
          duration: 3000,
        });
      });
      console.log("Error save receipt: ", error);
    } finally {
      // isLoading.value = false
    }
  };

  const getRaws = async () => {
    try {
      // isLoading.value = true
      const { data } = await ApiRaws.getRaws(1, 100);
      if (data) {
        rawsData.value = data;
      }
    } catch (error: any) {
      // isLoading.value = false

      console.log("Error in rows api: ", error);
    } finally {
      // isLoading.value = false
    }
  };
  const getReceipts = async () => {
    try {
      // isLoading.value = true
      const { data } = await ApiReceipts.getReceipts(1, 100);
      if (data) {
        receiptsData.value = data;
      }
    } catch (error: any) {
      // isLoading.value = false

      console.log("Error in receipts api: ", error);
    } finally {
      // isLoading.value = false
    }
  };

  const getSingleRation = async (id) => {
    try {
      // isLoading.value = true
      const { data } = await ApiRations.getSingleRation(id);
      if (data) {
        singleRation.value = data;
        if (route.query.type) {
          queryType.value = route.query.type;
        }
      }
    } catch (error: any) {
      console.log("error ", error);
    } finally {
      // isLoading.value = false
    }
  };

  onMounted(() => {
    isLoading.value = true;
    Promise.allSettled([getRaws(), getReceipts()]).then(() => {
      isLoading.value = false;
    });
    if (route.query.id) {
      getSingleRation(route.query.id).then(() => {
        isLoading.value = false;
      });
    }
  });

  return {
    isLoading,
    singleRation,
    rawsData,
    receiptsData,
    queryType,
    onSaveRation,
  };
}
