import { defineStore } from "pinia";
import { ref } from "vue";

interface INewOrder {
    client_id: number | string,
    receipt: any,
    receipt_id: number,
    receipt_name: string,
    selectedAnimalTypes: any,
    animal_type_id: number,
    date: string,
    amount: number,
}
const useOrdersStore = defineStore("ordersStore", () => {
    const isEditState = ref<boolean>(false)
    const deleteOrderId = ref<any>(null)
    const newOrderState = ref<INewOrder>({
        client_id: null,
        receipt: null,
        receipt_id: null,
        receipt_name: null,
        selectedAnimalTypes: null,
        animal_type_id: null,
        date: null,
        amount: null
    })
    const setDeleteOrderId = (id) => {
        deleteOrderId.value = id
    }
    const setIsEditState = (flag: boolean) => {
        isEditState.value = flag
    }

    const saveOrder = (data: any) => {
        newOrderState.value = {
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
        newOrderState.value.selectedAnimalTypes = null
        newOrderState.value.animal_type_id = null
        newOrderState.value.date = null
        newOrderState.value.amount = null
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
