import { ref, onMounted } from "vue";
import { ApiClients } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";

export default function useModule() {
  const isLoading = ref<boolean>(false);
  const clientsData = ref();
  const { notify } = useNotification();
  const router = useRouter();
  const metaData = ref();
  // const route = useRoute();

  const getClients = async (page) => {
    try {
      isLoading.value = true;
      const data = await ApiClients.getClients(page);
      clientsData.value = data.data;
      metaData.value = data.meta;
    } catch (e: any) {
      console.log("Error in clients types api: ", e);
    } finally {
      isLoading.value = false;
    }
  };

  const editClient = async (id) => {
    router.push({
      name: "clients-add",
      query: {
        id,
      },
    });
  };

  const deleteClient = async (id) => {
    try {
      isLoading.value = true;
      await ApiClients.deleteClient(id).then(() => {
        getClients(1);
      });
      router.push("/clients");

      notify({
        type: "success",
        title: "Успешно удалено!",
      });
    } catch (error: any) {
      console.log("error in delete client api ", error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    getClients(1);
  });

  return {
    isLoading,
    clientsData,
    metaData,
    deleteClient,
    getClients,
    editClient,
  };
}
