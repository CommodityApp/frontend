import { ApiOrders } from "@/shared/api";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
import useOrdersStore from "@/app/stores/OrdersStore";

export default function useModule() {
    const selectedData = ref()
    const route = useRoute()
    const router = useRouter()
    const { notify }  = useNotification()
    const ordersStore = useOrdersStore()

    const getReport = async (id) => {
        try {
            const {data} = await ApiOrders.getReport(id)
            if(data) {    
                selectedData.value = data
            }

          } catch (e: any) {
            
            console.log("Error report api: ", e);
          }
      }
    const editOrder = async () => {
    // console.log('get: ',selectedData.value)//batch_inputs[], batch_quantity, error
        ordersStore.newOrderState.client_id = selectedData.value.client?.id
        ordersStore.newOrderState.receipt = {'id':selectedData.value.receipt?.id, 'name':selectedData.value.receipt.name}  
        ordersStore.newOrderState.date = selectedData.value?.date
        ordersStore.newOrderState.amount = selectedData.value?.amount

        ordersStore.newOrderState.batch_inputs = selectedData.value?.batch_inputs
        ordersStore.newOrderState.batch_quantity = selectedData.value?.batch_quantity
        ordersStore.newOrderState.error = parseFloat(((selectedData.value.error - 1) * 100).toPrecision(3))

        ordersStore.newOrderState.receipt_id = selectedData.value?.receipt.id
        ordersStore.newOrderState.receipt_name = selectedData.value?.receipt?.name
        // ---------------------------------------------------------------------
        ordersStore.setIsEditState(true)
        ordersStore.setDeleteOrderId(route.params.id)
        router.replace({path:"/orders/add"})
    }

    const deleteOrder = async () => {
        try {
            await ApiOrders.deleteOrder(route.params.id).then(()=>{
                router.replace("/orders")
                notify({
                    type:"success",
                    title: "Заказ успешно удалено!",
                    speed: 500,
                    duration: 1000,
                });
            })
        } catch(error: any) {
            console.log("Error delete order Api: ", error)
        }
        
    }
    onMounted(() => {
        getReport(route.params.id)
    })

    return {
        deleteOrder,
        editOrder,
        selectedData
    }
}