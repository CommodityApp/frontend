import { useRouter } from "vue-router";
import useOrdersStore from "@/app/stores/OrdersStore";
import { ref } from "vue";
import { ApiOrders } from "@/shared/api";

export default function useModule() {
    const router = useRouter()
    const ordersStore = useOrdersStore()
    
    const numberOfBatches = ref<number>(1);
    const batches = ref<string[]>([]);
    const error = ref<number>();

    const setNumOfBatches = (num) => {
        if(num > 0){
            numberOfBatches.value++;
            batches.value.push(null)
        } else if(numberOfBatches.value > 0) {
            batches.value.pop()
            numberOfBatches.value--
        }
    };

    const calculateOrder = async () => {
        const orderData = {
            ...ordersStore.newOrderState,
            batch_quantity: batches.value.length,
            batch_inputs: batches.value,
            error: error.value
        }
        delete orderData.receipt_name
        // console.log(orderData)
        try {
            const { data } = await ApiOrders.createOrder(orderData)
            if(data){
                router.push({
                    path:`/orders/task/${data.data.id}`,
                    replace: true 
                })
                // router.push(`/orders/report/${data.data.id}`)
            }
            
        } catch (e: any){
            console.log("Error create order: ", e)
        } finally {
            ordersStore.clearOrder()
        }
        // router.push('/orders/report')
    }
    
    return {
        newOrderState: ordersStore.newOrderState,
        numberOfBatches,
        batches,
        error,
        calculateOrder,
        setNumOfBatches
    }
}