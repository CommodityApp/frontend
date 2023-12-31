import axios from "../plugins/axios";

export const getProducers = async (page = 1, per_page = 10) => {
  const { data } = await axios.get(
    `/producers?include=firstActivity.causer&page=${page}&per_page=${per_page}&sort=-id`
  );

  return {
    ...data,
  };
};

export const getSingleProducer = async (id) => {
  const { data } = await axios.get(`/producers/${id}`);

  return {
    ...data,
  };
};

export const saveProducer = async (producerData) => {
  const { data } = await axios.post("/producers", {
    name: producerData.name,
    country_id: producerData.country_id,
  });

  return {
    ...data,
  };
};

export const updateProducer = async (id, producerData) => {
  const { data } = await axios.put(`/producers/${id}`, {
    name: producerData.name,
    country_id: producerData.country_id,
  });

  return {
    ...data,
  };
};

export const deleteProducer = async (id) => {
  const { data } = await axios.delete(`/producers/${id}`);

  return {
    ...data,
  };
};
