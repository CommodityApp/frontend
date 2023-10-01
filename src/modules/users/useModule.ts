import { ref, onMounted } from "vue";
import { ApiUsers } from "@/shared/api";

export default function useModule() {
    const isLoading = ref<boolean>(false)
    const usersData = ref()
    
    const getUsers = async () => {
        try {
            isLoading.value = true
            const { data } = await ApiUsers.getUsers();
            usersData.value = data
        } catch(e: any){

            console.log('Error in users api: ', e)
        } finally {
            isLoading.value = false
        }
    }

    onMounted(() => {
        getUsers()
    })
    
    return {
        isLoading,
        usersData
    }
}