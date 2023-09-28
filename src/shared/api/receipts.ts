import axios from "../plugins/axios";

export const getReceipts = async () => {
    const { data } = await axios.get("/receipts?filter[name]=1&include=receiptRaws.raw.lastRawPrice")
    return {
        ...data
    }
}