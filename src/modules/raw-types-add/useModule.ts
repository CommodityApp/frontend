import { onMounted, ref } from "vue";
import { ApiRawTypes } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter, useRoute } from "vue-router";

export default function useModule() {
  const { notify } = useNotification();
  const router = useRouter();
  const route = useRoute();
  const isLoading = ref<boolean>(false);
  const rawTypesData = ref();

  const saveRawTypes = async (rawTypeData) => {
    try {
      isLoading.value = true;
      await ApiRawTypes.saveRawType(rawTypeData);

      router.push("/raw-types");
      notify({
        type: "success",
        title: "Успешно добавлено!",
      });
    } catch (error: any) {
      notify({
        type: "danger",
        title: error.response.data.message,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const updateRawType = async (rawTypeData) => {
    try {
      isLoading.value = true;
      await ApiRawTypes.updateRawType(route.query.id, rawTypeData).then(() => {
        router.push("/raw-types");
        notify({
          type: "success",
          title: "Успешно изменено!",
        });
      });
    } catch (error: any) {
      console.log('error in update rawType api ', error)
    }
  };


  const getSingleRawType = async () => {
    try {
      isLoading.value = true;
      await ApiRawTypes.getSingleRawType(route.query.id).then((data) => {
        rawTypesData.value = data.data;
      });
    } catch (error: any) {
      notify({
        type: "danger",
        title: error.response.data.message,
      });
    } finally {
      isLoading.value = true;
    }
  }; 

  onMounted(() => {
    if (route.query.id) {
      getSingleRawType()    
    }
  });

  return {
    isLoading,
    saveRawTypes,
    updateRawType,
    rawTypesData
  };
}
