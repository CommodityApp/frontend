import { onMounted, ref } from "vue";
import { ApiClients, ApiCountries } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter, useRoute } from "vue-router";

export default function useModule() {
  const { notify } = useNotification();
  const router = useRouter();
  const route = useRoute();
  const isLoading = ref<boolean>(false);
  const clientsData = ref();
  const countriesData = ref();

  const saveClient = async (clientData) => {
    try {
      isLoading.value = true;
      await ApiClients.saveClient(clientData);

      router.push("/clients");
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

  const updateClient = async (clientData) => {
    try {
      isLoading.value = true;
      await ApiClients.updateClient(route.query.id, clientData).then(() => {
        router.push("/clients");
        notify({
          type: "success",
          title: "Успешно изменено!",
        });
      });
    } catch (error: any) {
      console.log('error in update client api ', error)
    }
  };


  const getSingleClient = async () => {
    try {
      isLoading.value = true;
      await ApiClients.getSingleClient(route.query.id).then((data) => {
        clientsData.value = data.data;
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

  const getCountries = async (country_name) => {
    try {
      isLoading.value = true;
      await ApiCountries.getCountries(country_name).then((data) => {
        countriesData.value = data.data;
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
      getSingleClient()    
    }
    getCountries('')
  });

  return {
    isLoading,
    saveClient,
    updateClient,
    getCountries,
    countriesData,
    clientsData,
  };
}
