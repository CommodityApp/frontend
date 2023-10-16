import { ref, onMounted } from "vue";
import { ApiActivities } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
// import { useRouter } from "vue-router";

export default function useModule() {
    const isLoading = ref<boolean>(false)
    const activitiesData = ref()
    const { notify } = useNotification();
    // const router = useRouter();
    // const route = useRoute();
    
    const getActivities = async () => {
        try {
            isLoading.value = true
            const { data } = await ApiActivities.getActivities();
            activitiesData.value = data
        } catch(e: any){

            console.log('Error in activities api: ', e)
        } finally {
            isLoading.value = false
        }
    }
    
    // const editClient = async (id) => {
    //     router.push({
    //         name:'clients-add',
    //         query: {
    //             id
    //         }
    //     })
    // }

    // const deleteClient = async (id) => {
    //     try {
    //       isLoading.value = true;
    //       await ApiClients.deleteClient(id).then(() => {
    //         getClients()
    //       });
    //       router.push("/clients");
          
    //       notify({
    //         type: "success",
    //         title: "Успешно удалено!",
    //       });
    //     } catch (error: any) {
    //       console.log('error in delete client api ', error)
    //     } finally {
    //         isLoading.value = false;
    //     }
    //   };

    onMounted(() => {
        getActivities()
    })
    
    return {
        isLoading,
        activitiesData,
    }
}