import axios from "../plugins/axios";

export const getPrices = async () => {
    const { data } = await axios.get("/prices")
    return {
        ...data
    }
}

export const savePrice = async (price: any) => {
    const { data } = await axios.post("/prices", {
         name: price.name,
         code: price.code,
         unit: price.unit,
        price_raws: price.price_raws
    })

    return {
        ...data
    }
}

export const updatePrice = async (id:any, price: any) => {
    const { data } = await axios.put(`/prices/${id}`, {
        name: price.name,
        code: price.code,
        unit: price.unit,
        price_raws: price.price_raws
   })

   return {
       ...data
   }
}

export const getSinglePrice = async(id) => {
    const { data } = await axios.get(`/prices/${id}`)
    return {
        ...data
    }
}

export const deletePrice = async (id) => {
    const { data } = await axios.delete(`/prices/${id}`)

    return {
        ...data
    }
}