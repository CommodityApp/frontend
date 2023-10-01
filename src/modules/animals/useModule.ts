import { ref, onMounted } from "vue";
import { ApiAnimalTypes } from "@/shared/api";

export default function useModule() {
    const isLoading = ref<boolean>(false)
    const animalsData = ref()
    
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
    
    return {
        isLoading,
        animalsData
    }
}