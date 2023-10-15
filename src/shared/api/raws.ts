import axios from "../plugins/axios";

export const getRaws = async () => {
    const { data } = await axios.get("/raws?include=lastRawPrice,firstActivity.causer&per_page=50")

    return {
        ...data
    }
}

export const saveRaw = async (rawsData) => {
    const { data } = await axios.post("/raws", {
            code: rawsData.code,
            name: rawsData.raw_name,
            unit: rawsData.unit,
            concentration: rawsData.concentration,
            batch_number: null,
            raw_type_id: rawsData.raw_type_id,
            country_id: null,
            bunker_id: rawsData.bunker_id,
            producer_id: rawsData.producer_id,
            description: rawsData.description
    })

    return {
        data
    }
}
export const updateRaw = async (raw_id, rawsData) => {
    const { data } = await axios.put(`/raws/${raw_id}`,{
        code: rawsData.code,
        name: rawsData.raw_name,
        unit: rawsData.unit,
        concentration: rawsData.concentration,
        batch_number: null,
        raw_type_id: rawsData.raw_type_id,
        country_id: null,
        bunker_id: rawsData.bunker_id,
        producer_id: rawsData.producer_id,
        description: rawsData.description
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