import { useRouter, useRoute } from "vue-router";
import useOrdersStore from "@/app/stores/OrdersStore";
import { onMounted, ref, watch } from "vue";
import { ApiOrders } from "@/shared/api";
import { useNotification } from "@kyvg/vue3-notification";

export default function useModule() {
    const router = useRouter()
    const route = useRoute()
    const ordersStore = useOrdersStore()
    const { notify }  = useNotification()

    const numberOfBatches = ref<number>(1);
    const batches = ref<number[]>([]);
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
    const editOrder = async () => {
        calculateOrder(true)
    }

    const calculateOrder = async (editFlag:boolean = false) => {
        const orderData = {
            ...ordersStore.newOrderState,
            batch_quantity: batches.value.length,
            batch_inputs: batches.value.filter((item) => { return item !== null }),
            error: 1 + error.value / 100
        }
        delete orderData.receipt_name
        // console.log(orderData)
        try {
            // console.log('check ',editFlag)
            const { data } = editFlag ? await ApiOrders.editOrder(orderData) : await ApiOrders.createOrder(orderData) 
            
            if(data){
                ordersStore.clearOrder()
                router.push({
                    path:`/orders/task/${data.data.id}`,
                    replace: true 
                })
                notify({
                    type:"success",
                    title: `Успешно ${editFlag ? 'отредактировано' : 'добавлено' }!`,
                    speed: 500,
                    duration: 1000,
                  });
            }
            
        } catch (error: any){
            console.log("Error create order: ", error)
            const errors = error?.response?.data.errors
            if(errors){
                Object.values(errors).forEach(item => {
                    notify({
                        type: "error",
                        title: "Ошибка!",
                        text: item[0],
                        speed: 500,
                        duration: 3000,
                    })
                })
            }else {
                notify({
                    type: "error",
                    title: "Ошибка!",
                    text: error.response.data.message,
                    speed: 500,
                    duration: 3000,
                })
            }
        } finally {
            // ordersStore.clearOrder()
            if(editFlag){
                ordersStore.setIsEditState(false)
            }
        }
        // router.push('/orders/report')
    }

    onMounted(() => {
        ordersStore.newOrderState.error ? error.value = ordersStore.newOrderState.error : null
        ordersStore.newOrderState.batch_inputs ? batches.value = ordersStore.newOrderState.batch_inputs : null
        ordersStore.newOrderState.batch_quantity ? numberOfBatches.value = ordersStore.newOrderState.batch_quantity : null
        
    })

    watch(batches, () => {
        let sumOfBatches

        if(batches.value){
            sumOfBatches = batches.value.reduce((acc:any, item) => {
                return acc = acc + item
            }, 0)
        }
        
        ordersStore.newOrderState.amount == sumOfBatches 
            ? visibleAlert.value = false 
            : visibleAlert.value = true
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
        editOrder,
        setNumOfBatches
    }
}