import { ApiOrders } from "@/shared/api";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
import  useOrdersStore  from "@/app/stores/OrdersStore";

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
        console.log("edit ", selectedData.value)
        ordersStore.newOrderState.client_id = selectedData.value.client.id
        ordersStore.newOrderState.receipt = selectedData.value.receipt
        ordersStore.newOrderState.selectedAnimalTypes = selectedData.value.animal_type
        ordersStore.newOrderState.animal_type_id = selectedData.value.animal_type.id
        ordersStore.newOrderState.date = selectedData.value.date
        ordersStore.newOrderState.amount = selectedData.value.amount

        // ordersStore.newOrderState.receipt_id = selectedData.value.receipt.id
        // ordersStore.newOrderState.receipt_name = selectedData.value.receipt.name
        ordersStore.setIsEditState(true)
        ordersStore.setDeleteOrderId(route.params.id)
        router.replace({path:"/orders/add"})
    }

    const deleteOrder = async () => {
        router.replace("/orders")
        notify({
            type:"success",
            title: "Заказ успешно удалено!",
            speed: 500,
            duration: 1000,
        });

        try {
            await ApiOrders.deleteOrder(route.params.id)
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