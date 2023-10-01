import { ref, onMounted } from "vue";
import { ApiRaws } from "@/shared/api";

export default function useModule() {
    const isLoading = ref<boolean>(false)
    const rawsData = ref()
    
    const getRaws = async () => {
        try {
            isLoading.value = true
            const { data } = await ApiRaws.getRaws();
            rawsData.value = data
        } catch(e: any){

            console.log('Error in raws api: ', e)
        } finally {
            isLoading.value = false
        }
    }

    onMounted(() => {
        getRaws()
    })
    
    return {
        isLoading,
        rawsData
    }
}