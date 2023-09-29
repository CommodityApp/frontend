// import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { ApiOrders } from "@/shared/api";
import { useRouter } from "vue-router";
import useOrdersStore from "@/app/stores/OrdersStore";

export default function useModule() {
    const ordersStore = useOrdersStore()
    const router = useRouter()

    const isLoading = ref<boolean>(false)
    const orders = ref([])

    const addNewOrder = () => {
        ordersStore.clearOrder()
        router.push("/orders/add")
    }
    
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
        }
        
    })
    
    return {
        orders,
        isLoading,
        addNewOrder
    }
}