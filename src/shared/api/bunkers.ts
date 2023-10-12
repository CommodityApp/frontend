import axios from "../plugins/axios";

export const getBunkers = async () => {
    const { data } = await axios.get("/bunkers")

    return {
        ...data
    }
}

export const getSingleBunker = async (id) => {
    const { data } = await axios.get(`/bunkers/${id}`)

    return {
        ...data
    }
}