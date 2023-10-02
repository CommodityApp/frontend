import axios from "../plugins/axios";
import useOrdersStore from "@/app/stores/OrdersStore";

export const getOrders = async () => {
    const { data } = await axios.get("/orders?include=animalType,receipt,client");
    return {
        ...data
    }
}

export const createOrder = async (order) => {
    const { data } = await axios.post("/orders", {
        client_id : order.client_id,
        receipt_id: order.receipt_id ,
        batch_quantity : order.batch_quantity ,
        batch_inputs : order.batch_inputs,
        animal_type_id : order.animal_type_id,
        date : order.date,
        amount : order.amount,
        error: order.error
    })

    return {
        data
    }
}

export const editOrder = async (order) => {
    const ordersStore = useOrdersStore()
    const { data } = await axios.put(`/orders/${ordersStore.deleteOrderId}`, {
        client_id : order.client_id,
        receipt_id: order.receipt_id ,
        batch_quantity : order.batch_quantity ,
        batch_inputs : order.batch_inputs,
        animal_type_id : order.animal_type_id,
        date : order.date,
        amount : order.amount,
        error: order.error
    })

    return {
        data
    }
}

export const deleteOrder = async (id) => {
    const { data } = await axios.delete(`/orders/${id}`)

    return {
        ...data
    }
}

export const getReport = async (id) => {
    const { data } = await axios.get(`/orders/${id}`)

    return {
        ...data
    }
}