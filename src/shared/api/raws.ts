import axios from "../plugins/axios";

export const getRaws = async () => {
    const { data } = await axios.get("/raws?per_page=50")

    return {
        ...data
    }
}

export const saveRaw = async (raw_name) => {
    const { data } = await axios.post("/raws", {
            code: null,
            name: raw_name,
            unit: null,
            concentration: null,
            batch_number: null,
            raw_type_id: null,
            country_id: null,
            bunker_id: null,
            producer_id: null
    })

    return {
        data
    }
}
export const updateRaw = async (raw_id, raw_name) => {
    const { data } = await axios.put(`/raws/${raw_id}`,{
        code: null,
        name: raw_name,
        unit: null,
        concentration: null,
        batch_number: null,
        raw_type_id: null,
        country_id: null,
        bunker_id: null,
        producer_id: null
})

    return {
        data
    }
}
export const getSingleRaw = async (raw_id) => {
    const { data } = await axios.get(`/raws/${raw_id}`)

    return {
        data
    }
}

export const deleteRaw = async (raw_id) => {
    const { data } = await axios.delete(`/raws/${raw_id}`)

    return {
        data
    }
}