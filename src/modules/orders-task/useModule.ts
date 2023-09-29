import { useRouter } from "vue-router";
import useOrdersStore from "@/app/stores/OrdersStore";
import { ref, watch } from "vue";
import { ApiOrders } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";

export default function useModule() {
    const router = useRouter()
    const ordersStore = useOrdersStore()
    const { notify }  = useNotification()

    const numberOfBatches = ref<number>(1);
    const batches = ref<string[]>([]);
    const error = ref<number>();
    const visibleAlert = ref<boolean>();

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
            batch_inputs: batches.value.filter((item) => { return item !== null }),
            error: error.value
        }
        delete orderData.receipt_name
        // console.log(orderData)
        try {
            const { data } = await ApiOrders.createOrder(orderData)
            if(data){
                ordersStore.clearOrder()
                router.push({
                    path:`/orders/task/${data.data.id}`,
                    replace: true 
                })
                notify({
                    type:"success",
                    title: "Успешно добавлено!",
                    speed: 500,
                    duration: 1000,
                  });
            }
            
        } catch (error: any){
            console.log("Error create order: ", error)
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
        } finally {
            // ordersStore.clearOrder()
        }
        // router.push('/orders/report')
    }

    watch(batches, () => {
        let sumOfBatches = batches.value.reduce((acc:unknown, item) => {
            return acc = acc + item
        }, 0)
        
        ordersStore.newOrderState.amount == sumOfBatches ? visibleAlert.value = false : visibleAlert.value = true
        console.log(sumOfBatches, visibleAlert.value)
    }, 
    {
        deep: true
    })
    
    return {
        newOrderState: ordersStore.newOrderState,
        numberOfBatches,
        batches,
        error,
        visibleAlert,
        calculateOrder,
        setNumOfBatches
    }
}