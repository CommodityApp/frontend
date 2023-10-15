import { ref, onMounted } from "vue";
import { ApiAnimalTypes } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";

export default function useModule() {
    const isLoading = ref<boolean>(false)
    const animalsData = ref()
    const { notify } = useNotification();
    const router = useRouter();
    
    const getAnimalTypes = async () => {
        try {
            isLoading.value = true
            const { data } = await ApiAnimalTypes.getAnimalTypes()
            animalsData.value = data
        } catch(e: any){

            console.log('Error in animal types api: ', e)
        } finally {
            isLoading.value = false
        }
    }

    onMounted(() => {
        getAnimalTypes()
    })
    const editAnimalsTypes = async (id) => {
        router.push({
            name:'animals-add',
            query: {
                id
            }
        })
    }
    
    const deleteAnimalTypes = async (id) => {
        try {
          isLoading.value = true;
          await ApiAnimalTypes.deleteAnimalTypes(id).then(() => {
            getAnimalTypes()
          });
          router.push("/animals");
          
          notify({
            type: "success",
            title: "Успешно удалено!",
          });
        } catch (error: any) {
          console.log('error in delete user api ', error)
        } finally {
            isLoading.value = false;
        }
      };
    return {
        isLoading,
        animalsData,
        editAnimalsTypes,
        deleteAnimalTypes
    }
}