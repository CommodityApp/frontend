import { ApiOrders } from "@/shared/api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default function useModule() {
    const selectedData = ref();
    const route = useRoute()

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
    onMounted(() => {
        getReport(route.params.id)
    })

    return {
        selectedData
    }
}