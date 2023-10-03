import { onMounted, ref } from "vue";
import { ApiRaws } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter, useRoute } from "vue-router";

export default function useModule() {
  const { notify } = useNotification();
  const router = useRouter();
  const route = useRoute();
  const isLoading = ref<boolean>(false);
  const rawsData = ref();

  const saveRaw = async (raw_name) => {
    try {
      isLoading.value = true;
      await ApiRaws.saveRaw(raw_name);

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

  const updateRaw = async (raw_name) => {
    try {
      isLoading.value = true;
      await ApiRaws.updateRaw(route.query.id, raw_name).then(() => {
        router.push("/raws");
        notify({
          type: "success",
          title: "Успешно изменено!",
        });
      });
    } catch (error: any) {}
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

  onMounted(() => {
    if (route.query.id) {
      getSingleRaw(route.query.id);
    }
  });

  return {
    isLoading,
    saveRaw,
    updateRaw,
    rawsData,
  };
}
