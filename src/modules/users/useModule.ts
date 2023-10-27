import { ref, onMounted } from "vue";
import { ApiUsers } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";

export default function useModule() {
  const isLoading = ref<boolean>(false);
  const usersData = ref();
  const { notify } = useNotification();
  const router = useRouter();
  const metaData = ref();

  const getUsers = async (page) => {
    try {
      isLoading.value = true;
      const { data } = await ApiUsers.getUsers(page);
      usersData.value = data.data;
      metaData.value = data.meta;
      console.log(metaData.value);
    } catch (e: any) {
      console.log("Error in users api: ", e);
    } finally {
      isLoading.value = false;
    }
  };

  const editUser = async (id) => {
    router.push({
      name: "users-add",
      query: {
        id,
      },
    });
  };

  const deleteUser = async (id) => {
    try {
      isLoading.value = true;
      await ApiUsers.deleteUser(id).then(() => {
        getUsers(1);
      });
      router.push("/users");

      notify({
        type: "success",
        title: "Успешно удалено!",
      });
    } catch (error: any) {
      console.log("error in delete user api ", error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    getUsers(1);
  });

  return {
    isLoading,
    usersData,
    metaData,
    deleteUser,
    editUser,
    getUsers,
  };
}
