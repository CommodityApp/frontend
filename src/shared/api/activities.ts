import axios from "../plugins/axios";

export const getActivities = async (page=1) => {
    const {data} = await axios.get(`/activities?include=causer&page=${page}`);
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
