import axios from "../plugins/axios";

export const getAnimalTypes = async (page = 1) => {
  const { data } = await axios.get(
    `/animal-types?tree=true&page=${page}&per_page=10&sort=-id`
  );
  return data;
};

export const getSingleAnimalTypes = async (id) => {
  const { data } = await axios.get(`/animal-types/${id}`);
  return {
    ...data,
  };
};

export const saveAnimalTypes = async (animalTypeData) => {
  const { data } = await axios.post("/animal-types", {
    name: animalTypeData.name,
    parent_id: animalTypeData.parent_id,
  });

  return {
    ...data,
  };
};

export const updateAnimalTypes = async (id, animalTypeData) => {
  const { data } = await axios.put(`/animal-types/${id}`, {
    name: animalTypeData.name,
    parent_id: animalTypeData.parent_id,
  });

  return {
    ...data,
  };
};

export const deleteAnimalTypes = async (id) => {
  const { data } = await axios.delete(`/animal-types/${id}`);
  return {
    ...data,
  };
};
