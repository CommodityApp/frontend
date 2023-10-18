import axios from "../plugins/axios";

export const getClients = async () => {
    const {data} = await axios.get("/clients?include=country");
    return {
        ...data
    }
}

export const updateClient = async (id, clientData) => {
    const {data} = await axios.put(`/clients/${id}`, {
        name: clientData.name,
        country_id: clientData.country_id,
        company: clientData.company,
        region: clientData.region,
        email: clientData.email,
        industry: clientData.industry
    })

    return {
        ...data
    }
}

export const deleteClient = async (id) => {
    const {data} = await axios.delete(`/clients/${id}`)

    return {
        ...data
    }
}

export const getSingleClient = async (id) => {
    const {data} = await axios.get(`/clients/${id}`)

    return {
        ...data
    }
}

export const saveClient = async (clientData) => {
    const {data} = await axios.post("/clients", {
        name: clientData.name,
        country_id: clientData.country_id,
        company: clientData.company,
        region: clientData.region,
        email: clientData.email,
        industry: clientData.industry
    })

    return {
        ...data
    }
}