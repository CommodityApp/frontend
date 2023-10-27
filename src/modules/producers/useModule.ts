import { ref, onMounted } from "vue";
import { ApiProducers } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";

export default function useModule() {
  const isLoading = ref<boolean>(false);
  const producersData = ref();
  const { notify } = useNotification();
  const router = useRouter();
  const metaData = ref();

  const getProducers = async (page) => {
    try {
      isLoading.value = true;
      const data = await ApiProducers.getProducers(page);
      producersData.value = data.data;
      metaData.value = data.meta;
    } catch (e: any) {
      console.log("Error in producer api: ", e);
    } finally {
      isLoading.value = false;
    }
  };

  const editProducer = async (id) => {
    router.push({
      name: "producers-add",
      query: {
        id,
      },
    });
  };

  const deleteProducer = async (id) => {
    try {
      isLoading.value = true;
      await ApiProducers.deleteProducer(id).then(() => {
        getProducers(1);
      });
      router.push("/producers");

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
    getProducers(1);
  });

  return {
    isLoading,
    producersData,
    metaData,
    deleteProducer,
    getProducers,
    editProducer,
  };
}
