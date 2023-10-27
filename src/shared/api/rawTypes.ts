import axios from "../plugins/axios";

export const getRawTypes = async (page = 1) => {
  const { data } = await axios.get(
    `/raw-types?page=${page}&per_page=10&sort=-id`
  );

  return {
    ...data,
  };
};

export const getSingleRawType = async (id) => {
  const { data } = await axios.get(`/raw-types/${id}`);

  return {
    ...data,
  };
};

export const saveRawType = async (rawTypeData) => {
  const { data } = await axios.post("/raw-types", {
    name: rawTypeData.name,
    unit: rawTypeData.unit,
  });

  return {
    ...data,
  };
};

export const updateRawType = async (id, rawTypeData) => {
  const { data } = await axios.put(`/raw-types/${id}`, {
    name: rawTypeData.name,
    unit: rawTypeData.unit,
  });

  return {
    ...data,
  };
};

export const deleteRawType = async (id) => {
  const { data } = await axios.delete(`/raw-types/${id}`);

  return {
    ...data,
  };
};
