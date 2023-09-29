import axios from "../plugins/axios";

export const getRaws = async () => {
    const { data } = await axios.get("/raws")

    return {
        ...data
    }
}