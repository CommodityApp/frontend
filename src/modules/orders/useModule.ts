// import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { ApiOrders } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";

export default function useModule() {
    // const router = useRouter()
    const isLoading = ref<boolean>(false)
    const orders = ref([])
    const { notify }  = useNotification()

    onMounted(async () => {
        try {
            isLoading.value = true
            const data: any = await ApiOrders.getOrders();
            orders.value = data.data
            // console.log(data.data)
        }catch(e:any){
            console.log('Error: ', e)
            isLoading.value = false
        } finally {
            isLoading.value = false
            notify({
                type:"success",
                title: "Authorization",
                text: "You have been logged in!",
                speed: 500,
                duration: 1000,
              });
        }
        
    })
    
    return {
        orders,
        isLoading
    }
}