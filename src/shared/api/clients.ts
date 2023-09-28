import axios from "../plugins/axios";

export const getClients = async () => {
    const {data} = await axios.get("/clients?include=country&filter[name]=A&sort=-name&page=1");
    return {
        ...data
    }
}