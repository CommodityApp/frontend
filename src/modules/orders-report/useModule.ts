import { ApiOrders } from "@/shared/api";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";

export default function useModule() {
    const selectedData = ref();
    const route = useRoute()
    const router = useRouter()
    const { notify }  = useNotification()

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
        selectedData
    }
}