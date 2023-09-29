import { ApiReceipts, ApiRaws } from "@/shared/api";
import { onMounted, ref, reactive } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter, useRoute } from "vue-router";

export default function useModule() {
    const { notify } = useNotification()
    const router = useRouter()
    const route = useRoute()
    const isLoading = ref<boolean>(false)

    const rawsData = ref()
    const singleReceipt = ref()
    

    const onSaveReceipt = async (receipt) => {
        try {
            isLoading.value = true
            if(route.query.id){
                const { data } = await ApiReceipts.updateReceipt(route.query.id, receipt)
                notify({
                    type: "success",
                    title: "Успешно изминено!"
                })
            } else{
                const { data } = await ApiReceipts.saveReceipt(receipt)
                notify({
                    type: "success",
                    title: "Успешно добавлено!"
                })
            }
            router.replace("/receipts")
        } catch(error: any){
            isLoading.value = false
            const errors = error?.response?.data.errors
            
            Object.values(errors).forEach(item => {
                notify({
                    type: "error",
                    title: "Ошибка!",
                    text: item[0],
                    speed: 500,
                    duration: 3000,
                })
            })
            
                

            console.log('Error save receipt: ',error)
        } finally{
            isLoading.value = false
        }
    }

    const getRaws = async () => {
        try {
            isLoading.value = true
            const {data} = await ApiRaws.getRaws()
            if(data){
                rawsData.value = data
            }
        } catch (error: any) {
            isLoading.value = false

            console.log("Error in rows api: ", error)
        } finally {
            isLoading.value = false
        }
    }

    const getSingleReceipt = async (id) => {
        try {
            isLoading.value = true
            const {data} = await ApiReceipts.getReceiptById(id)
            if(data){
                singleReceipt.value = data
                // console.log('ff ',singleReceipt.value)
            }
        } catch(error: any) {
            console.log("Single receipt api error: ", error)
        } finally {
            isLoading.value = false
        }
    }

    onMounted(() => {
        getRaws()
        // console.log(route.query.id)
        if(route.query.id){
            getSingleReceipt(route.query.id)
        }
    })
    return {
        isLoading,
        rawsData,
        singleReceipt,
        onSaveReceipt
    }
}