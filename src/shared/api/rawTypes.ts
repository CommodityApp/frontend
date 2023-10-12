import axios from "../plugins/axios";

export const getRawTypes = async () => {
    const { data } = await axios.get("/raw-types")

    return {
        ...data
    }
}

export const getSingleRawType = async (id) => {
    const { data } = await axios.get(`/raw-types/${id}`)

    return {
        ...data
    }
}