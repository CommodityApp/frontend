import axios from "../plugins/axios";

export const getActivities = async () => {
    const {data} = await axios.get("/activities?include=causer");
    return {
        ...data
    }
}

export const getSingleActivity = async (id) => {
    const {data} = await axios.get(`/activities/${id}`)

    return {
        ...data
    }
}
