import { onMounted, ref } from "vue";
import { ApiRaws, ApiRawTypes, ApiProducers, ApiBunkers } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter, useRoute } from "vue-router";

export default function useModule() {
  const { notify } = useNotification();
  const router = useRouter();
  const route = useRoute();
  const isLoading = ref<boolean>(false);
  const rawsData = ref();
  const rawTypes = ref();
  const producers = ref();
  const bunkers = ref();

  const saveRaw = async (rawsData) => {
    try {
      isLoading.value = true;
      await ApiRaws.saveRaw(rawsData);

      router.push("/raws");
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

  const updateRaw = async (rawsData) => {
    try {
      isLoading.value = true;
      await ApiRaws.updateRaw(route.query.id, rawsData).then(() => {
        router.push("/raws");
        notify({
          type: "success",
          title: "Успешно изменено!",
        });
      });
    } catch (error: any) {
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
    }
  };

  const getSingleRaw = async (raw_id) => {
    try {
      isLoading.value = true;
      await ApiRaws.getSingleRaw(raw_id).then((data) => {
        rawsData.value = data.data.data;
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

  const getRawTypes = async () => {
    try {
      isLoading.value = true;
      const { data } = await ApiRawTypes.getRawTypes()
      if(data){
        rawTypes.value = data
      }
    } catch(error: any){
      console.log('error in rawtypes api', error)
    } finally {
      isLoading.value = false
    }
  }
  const getProducers = async () => {
    try {
      isLoading.value = true;
      const { data } = await ApiProducers.getProducers()
      if(data){
        producers.value = data
      }
    } catch(error: any){
      console.log('error in producers api', error)
    } finally {
      isLoading.value = false
    }
  }
  const getBunkers = async () => {
    try {
      isLoading.value = true;
      const { data } = await ApiBunkers.getBunkers()
      if(data){
        bunkers.value = data
      }
    } catch(error: any){
      console.log('error in bunkers api', error)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    Promise.allSettled([getRawTypes(), getProducers(), getBunkers()])
    if (route.query.id) { 
      getSingleRaw(route.query.id)    
    }
  });

  return {
    isLoading,
    saveRaw,
    updateRaw,
    rawTypes,
    producers,
    bunkers,
    rawsData,
  };
}
