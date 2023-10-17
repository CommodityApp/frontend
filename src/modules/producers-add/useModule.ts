import { onMounted, ref } from "vue";
import { ApiProducers, ApiCountries } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter, useRoute } from "vue-router";

export default function useModule() {
  const { notify } = useNotification();
  const router = useRouter();
  const route = useRoute();
  const isLoading = ref<boolean>(false);
  const producersData = ref();
  const countriesData = ref();

  const saveProducer = async (producerData) => {
    try {
      isLoading.value = true;
      await ApiProducers.saveProducer(producerData);

      router.push("/producers");
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

  const updateProducer = async (producerData) => {
    try {
      isLoading.value = true;
      await ApiProducers.updateProducer(route.query.id, producerData).then(() => {
        router.push("/producers");
        notify({
          type: "success",
          title: "Успешно изменено!",
        });
      });
    } catch (error: any) {
      console.log('error in update producer api ', error)
      const errors = error?.response?.data.errors
        Object.values(errors).forEach(item => {
            notify({
                type: "error",
                title: "Ошибка!",
                text: item[0],
                speed: 500,
                duration: 3000,
            })
        })
      // notify({
      //   type: "danger",
      //   title: error.response.data.message,
      // });
    }
  };


  const getSingleProducer = async () => {
    try {
      isLoading.value = true;
      await ApiProducers.getSingleProducer(route.query.id).then((data) => {
        producersData.value = data.data;
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
      getSingleProducer()    
    }
    getCountries('')
  });

  return {
    isLoading,
    saveProducer,
    updateProducer,
    getCountries,
    countriesData,
    producersData,
  };
}
