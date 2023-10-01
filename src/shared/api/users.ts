import axios from "../plugins/axios";

export const getUsers = async () => {
    const { data } = await axios.get("/profile")

    return {
        data
    }
}