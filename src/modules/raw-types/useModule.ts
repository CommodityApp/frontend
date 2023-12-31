import { ref, onMounted } from "vue";
import { ApiRawTypes } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";

export default function useModule() {
  const isLoading = ref<boolean>(false);
  const rawTypesData = ref();
  const { notify } = useNotification();
  const router = useRouter();
  const metaData = ref();

  const getRawTypes = async (page) => {
    try {
      isLoading.value = true;
      const data = await ApiRawTypes.getRawTypes(page);
      rawTypesData.value = data.data;
      metaData.value = data.meta;
    } catch (e: any) {
      console.log("Error in rawTypes api: ", e);
    } finally {
      isLoading.value = false;
    }
  };

  const editRawType = async (id) => {
    router.push({
      name: "raw-types-add",
      query: {
        id,
      },
    });
  };

  const deleteRawType = async (id) => {
    try {
      isLoading.value = true;
      await ApiRawTypes.deleteRawType(id).then(() => {
        getRawTypes(1);
      });
      router.push("/raw-types");

      notify({
        type: "success",
        title: "Успешно удалено!",
      });
    } catch (error: any) {
      console.log("error in delete producer api ", error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    getRawTypes(1);
  });

  return {
    isLoading,
    rawTypesData,
    metaData,
    deleteRawType,
    editRawType,
    getRawTypes,
  };
}
