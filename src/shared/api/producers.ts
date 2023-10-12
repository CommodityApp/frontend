import axios from "../plugins/axios";

export const getProducers = async () => {
    const { data } = await axios.get("/producers")

    return {
        ...data
    }
}

export const getSingleProducer = async (id) => {
    const { data } = await axios.get(`/producers/${id}`)

    return {
        ...data
    }
}