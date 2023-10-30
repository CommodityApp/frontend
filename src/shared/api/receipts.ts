import axios from "../plugins/axios";

export const getReceipts = async (page = 1, per_page = 10) => {
  const { data } = await axios.get(
    `/receipts?include=receiptRaws.raw.lastRawPrice&page=${page}&per_page=${per_page}&sort=-id`
  );
  return {
    ...data,
  };
};

export const getReceiptById = async (id) => {
  const { data } = await axios.get(`/receipts/${id}`);

  return {
    ...data,
  };
};

export const saveReceipt = async (receipt: any) => {
  const { data } = await axios.post("/receipts", {
    name: receipt.name,
    rate: receipt.rate,
    code: receipt.code,
    unit: receipt.unit,
    animal_type_id: receipt.animal_type_id,
    producer_name: receipt.producer_name,
    concentration: receipt.concentration,
    receipt_raws: receipt.receipt_raws,
  });
  return {
    ...data,
  };
};

export const updateReceipt = async (id: any, receipt: any) => {
  const { data } = await axios.put(`/receipts/${id}`, {
    name: receipt.name,
    rate: receipt.rate,
    code: receipt.code,
    unit: receipt.unit,
    animal_type_id: receipt.animal_type_id,
    producer_name: receipt.producer_name,
    concentration: receipt.concentration,
    receipt_raws: receipt.receipt_raws,
  });
  return {
    ...data,
  };
};

export const deleteReceipt = async (id: number) => {
  const { data } = await axios.delete(`/receipts/${id}`);

  return {
    ...data,
  };
};
