import { defineStore } from "pinia";
import { ref } from "vue";

interface INewOrder {
    client_id: number | string,
    receipt: any,
    receipt_id: number,
    receipt_name: string,
    date: string,
    amount: number,
    
    batch_inputs: number[],
    batch_quantity: number,
    error: any
}
const useOrdersStore = defineStore("ordersStore", () => {
    const isEditState = ref<boolean>(false)
    const deleteOrderId = ref<any>(null)
    
    const newOrderState = ref<INewOrder>({
        client_id: null,
        receipt: null,
        receipt_id: null,
        receipt_name: null,
        date: null,
        amount: null,
        batch_inputs: null,
        batch_quantity: null,
        error: null
    })
    const setDeleteOrderId = (id) => {
        deleteOrderId.value = id
    }
    const setIsEditState = (flag: boolean) => {
        isEditState.value = flag
    }

    const saveOrder = (data: any) => {
        newOrderState.value = {
            ...newOrderState.value,
            ...data,
            receipt_id: data.receipt.id,
            receipt_name: data.receipt.name

        }
    }

    const clearOrder = () => {
        newOrderState.value.client_id = null
        newOrderState.value.receipt = null
        newOrderState.value.receipt_id = null
        newOrderState.value.receipt_name = null
        newOrderState.value.date = null
        newOrderState.value.amount = null

        newOrderState.value.batch_inputs = null
        newOrderState.value.batch_quantity = null
        newOrderState.value.error = null
    }

    return {
        isEditState,
        setIsEditState,
        newOrderState,
        saveOrder,
        clearOrder,
        deleteOrderId,
        setDeleteOrderId
    }
})
export default useOrdersStore
