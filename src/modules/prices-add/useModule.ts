import {ref, onMounted} from "vue";
import { ApiPrices } from "@/shared/api";
import { ApiRaws } from "@/shared/api";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";

export default function useModule() {
    const isLoading = ref<boolean>(false)
    const { notify } = useNotification()
    const router = useRouter()
    const route = useRoute()
    const singlePrice = ref([])
    const rawsData = ref()
    const queryType = ref()


    const onSavePrice = async (price) => {
        try {
            // isLoading.value = true
            if(route.query.id && !queryType.value){
                await ApiPrices.updatePrice(route.query.id, price).then(() => {
                    notify({
                        type: "success",
                        title: "Успешно изминено!"
                    })
                })
            } else {
                await ApiPrices.savePrice(price).then(() => {
                    notify({
                        type: "success",
                        title: "Успешно добавлено!"
                    })
                })
                
            }
            router.replace("/prices")
        } catch(error: any){
            // isLoading.value = false
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
            // isLoading.value = false
        }
    }


    const getRaws = async () => {
        try {
            // isLoading.value = true
            const {data} = await ApiRaws.getRaws()
            if(data){
                rawsData.value = data
            }
        } catch (error: any) {
            // isLoading.value = false

            console.log("Error in rows api: ", error)
        } finally {
            // isLoading.value = false
        }
    }

    const getSinglePrice = async(id) => {
        try{
            // isLoading.value = true
            const {data} = await ApiPrices.getSinglePrice(id)
            if(data){
                singlePrice.value = data 
                if(route.query.type){
                    queryType.value = route.query.type
                }
            }
            

        }catch(error: any){
            console.log("error ", error)

        }finally{
            // isLoading.value = false
        }
    }

    onMounted(() => {
        isLoading.value = true
        getRaws().then(() => {
            isLoading.value = false
        })
        if(route.query.id){
            getSinglePrice(route.query.id).then(()=>{
                isLoading.value = false
            })
        }
    })

    return {
        isLoading,
        singlePrice,
        rawsData,
        queryType,
        onSavePrice
    }
}