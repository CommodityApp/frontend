import { onMounted, ref } from "vue";
import { ApiUsers } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter, useRoute } from "vue-router";

export default function useModule() {
  const { notify } = useNotification();
  const router = useRouter();
  const route = useRoute();
  const isLoading = ref<boolean>(false);
  const usersData = ref();

  const saveUser = async (userData) => {
    try {
      isLoading.value = true;
      await ApiUsers.saveUser(userData);

      router.push("/users");
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

  const updateUser = async (userData) => {
    try {
      isLoading.value = true;
      await ApiUsers.updateUser(route.query.id, userData).then(() => {
        router.push("/users");
        notify({
          type: "success",
          title: "Успешно изменено!",
        });
      });
    } catch (error: any) {
      console.log('error in update user api ', error)
      notify({
        type: "danger",
        title: error.response.data.message,
      });
    }
  };


  const getSingleUser = async () => {
    try {
      isLoading.value = true;
      await ApiUsers.getSingleUser(route.query.id).then((data) => {
        usersData.value = data.data.data;
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
      getSingleUser()    
    }
  });

  return {
    isLoading,
    saveUser,
    updateUser,
    usersData,
  };
}
