import { onMounted, ref } from "vue";
import { ApiRations } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";

export default function useModule() {
  const rationData = ref();
  const isLoading = ref<boolean>(false);
  const { notify } = useNotification();
  const router = useRouter();
  const metaData = ref();

  const getRations = async (page) => {
    try {
      isLoading.value = true;
      const data = await ApiRations.getRations(page);

      rationData.value = data.data;
      metaData.value = data.meta;
    } catch (error: any) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteRation = async (id) => {
    try {
      isLoading.value = true;
      await ApiRations.deleteRation(id).then(() => {
        notify({
          type: "success",
          title: "Рацион успешно удалено!",
          speed: 500,
          duration: 1000,
        });
      });
    } catch (error: any) {
      console.log("error delete ration api:", error);
    } finally {
      isLoading.value = false;
      getRations(1);
    }
  };
  const editRation = (id) => {
    router.push({
      name: "rations-add",
      query: {
        id,
      },
    });
  };
  const cloneRation = (id, param) => {
    router.push({
      name: "rations-add",
      query: {
        id,
        type: param,
      },
    });
  };

  onMounted(() => {
    getRations(1);
  });
  return {
    isLoading,
    rationData,
    metaData,
    deleteRation,
    editRation,
    cloneRation,
    getRations,
  };
}
