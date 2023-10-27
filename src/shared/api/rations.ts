import axios from "../plugins/axios";

export const getRations = async (page = 1) => {
  const { data } = await axios.get(
    `/rations?include=firstActivity.causer,receipt&page=${page}&per_page=10&sort=-id`
  );
  return {
    ...data,
  };
};

export const saveRation = async (ration: any) => {
  const { data } = await axios.post("/rations", {
    name: ration.name,
    rate: ration.rate,
    code: ration.code,
    unit: ration.unit,
    producer_name: ration.producer_name,
    receipt_id: ration.receipt_id,
    animal_type_id: ration.animal_type_id,
    ration_raws: ration.ration_raws,
  });

  return {
    ...data,
  };
};

export const updateRation = async (id: any, ration: any) => {
  const { data } = await axios.put(`/rations/${id}`, {
    name: ration.name,
    rate: ration.rate,
    code: ration.code,
    unit: ration.unit,
    producer_name: ration.producer_name,
    receipt_id: ration.receipt_id,
    animal_type_id: ration.animal_type_id,
    ration_raws: ration.ration_raws,
  });

  return {
    ...data,
  };
};

export const getSingleRation = async (id) => {
  const { data } = await axios.get(`/rations/${id}`);
  return {
    ...data,
  };
};

export const deleteRation = async (id) => {
  const { data } = await axios.delete(`/rations/${id}`);

  return {
    ...data,
  };
};
