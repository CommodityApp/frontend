import { ref, onMounted } from "vue";
import { ApiRaws } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";

export default function useModule() {
    const isLoading = ref<boolean>(false)
    const rawsData = ref()
    const { notify } = useNotification()
    const router = useRouter()
    
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

    const deleteRaw = async (raw_id) => {
        try {
            isLoading.value = true
            await ApiRaws.deleteRaw(raw_id).then(() => {
                getRaws()
            })

            notify({
                type: "success",
                title: "Успешно удалено!"
            })
        }catch(error: any){
            notify({
                type: "danger",
                title: error.response.data.message
            })
        }finally{
            isLoading.value = false
        }
    }
    const editRaw = async (id) => {
        router.push({
            name:'raws-add',
            query: {
                id
            }
        })
    }

    onMounted(() => {
        getRaws()
    })
    
    return {
        isLoading,
        rawsData,
        deleteRaw,
        editRaw
    }
}