import { defineStore } from "pinia";
import { ref } from "vue";

interface INewOrder {
    client_id: number | string,
    receipt_id: number,
    receipt_name: string,
    animal_type_id: number,
    date: string,
    amount: number,
}
const useOrdersStore = defineStore("ordersStore", () => {
    
    const newOrderState = ref<INewOrder>({
        client_id: null,
        receipt_id: null,
        receipt_name: null,
        animal_type_id: null,
        date: null,
        amount: null
    })

    const saveOrder = (data: any) => {
        newOrderState.value = {
            ...data,
            receipt_id: data.receipt.id,
            receipt_name: data.receipt.name

        }
    }

    const clearOrder = () => {
        newOrderState.value.client_id = null
        newOrderState.value.receipt_id = null
        newOrderState.value.receipt_name = null
        newOrderState.value.animal_type_id = null
        newOrderState.value.date = null
        newOrderState.value.amount = null
    }

    return {
        newOrderState,
        saveOrder,
        clearOrder
    }
})
export default useOrdersStore
