import axios from "../plugins/axios";

export const getCountries = async (name) => {
    const {data} = await axios.get(`countries?filter[name]=${name}`)

    return {
        ...data
    }
}