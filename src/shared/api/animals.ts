import axios from "../plugins/axios";

export const getAnimalTypes = async ()=> {
    const { data } = await axios.get("/animal-types?tree=true");
    return {
        ...data
    }
}