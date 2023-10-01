import { ref, onMounted } from "vue";
import { ApiClients } from "@/shared/api";

export default function useModule() {
    const isLoading = ref<boolean>(false)
    const clientsData = ref()
    
    const getAnimalTypes = async () => {
        try {
            isLoading.value = true
            const { data } = await ApiClients.getClients();
            clientsData.value = data
        } catch(e: any){

            console.log('Error in clients types api: ', e)
        } finally {
            isLoading.value = false
        }
    }

    onMounted(() => {
        getAnimalTypes()
    })
    
    return {
        isLoading,
        clientsData
    }
}