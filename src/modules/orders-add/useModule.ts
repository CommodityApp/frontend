import { ApiClients, ApiReceipts, ApiAnimalTypes } from "@/shared/api";
import { IState } from "./types";
import { onMounted, ref, reactive } from "vue";
import useOrdersStore from "@/app/stores/OrdersStore"

export default function useModule() {
  const isLoading = ref<boolean>(false);
  const clients = ref([]);
  const receipts = ref([]);
  const animalTypes = ref([]);
  const ordersStore = useOrdersStore()

  const state = reactive<IState>({
    client_id: null,
    receipt: null,
    animal_type_id: null,
    selectedAnimalTypes: {},
    date: new Date().toISOString().slice(0,10),
    amount: null
  })

  const getClients = async () => {
    try {
        const data: any = await ApiClients.getClients();
        clients.value = data.data;
      } catch (e: any) {
        
        console.log("Error clients api: ", e);
      }
  }

  const getReceipts = async () => {
    try {
        const data: any = await ApiReceipts.getReceipts();
        receipts.value = data.data.map((item) => ({'id':item.id, 'name':item.name}) );
        
      } catch (e: any) {
        
        console.log("Error receipts api: ", e);
      }
  }

  const getAnimalTypes = async () => {
    try {
        const { data } = await ApiAnimalTypes.getAnimalTypes();
        animalTypes.value = data;
        
    } catch(e: any){
      console.log("Error Animal Types api: ", e);
    }
  }
  

  const onSaveStateOrder = (state: IState) => {
    ordersStore.saveOrder(state)
  }
  
  const setFromOrdersStore = () => {
    if(ordersStore.newOrderState.client_id){
      state.client_id = ordersStore.newOrderState.client_id
      state.receipt = ordersStore.newOrderState.receipt
      state.selectedAnimalTypes = ordersStore.newOrderState.selectedAnimalTypes
      state.animal_type_id = ordersStore.newOrderState.animal_type_id
      state.date = ordersStore.newOrderState.date
      state.amount = ordersStore.newOrderState.amount
      
      // console.log('mounted client_id exists',ordersStore.newOrderState)
    }
  }

  onMounted(async () => {
    try {
      isLoading.value = true;
      await Promise.allSettled([getClients(), getReceipts(), getAnimalTypes()])
    } catch (e: any) {
      
      console.log("Error: ", e);
      
    } finally {
      isLoading.value = false;
      setFromOrdersStore()
    }
  });
  return {
    clients,
    receipts,
    animalTypes,
    isLoading,
    state,
    onSaveStateOrder
  };
}
