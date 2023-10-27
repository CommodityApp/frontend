import axios from "../plugins/axios";

export const getUsers = async (page = 1) => {
  const { data } = await axios.get(
    `/users?include=firstActivity.causer,roles&page=${page}&per_page=10&sort=name`
  );

  return {
    data,
  };
};

export const getSingleUser = async (id) => {
  const { data } = await axios.get(`/users/${id}`);

  return {
    data,
  };
};

export const saveUser = async (userData) => {
  const { data } = await axios.post("/users", {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    roles: ["superadmin"],
  });

  return {
    data,
  };
};

export const updateUser = async (id, userData) => {
  const { data } = await axios.put(`/users/${id}`, {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    roles: ["superadmin"],
  });

  return {
    data,
  };
};

export const deleteUser = async (id) => {
  const { data } = await axios.delete(`/users/${id}`);

  return {
    data,
  };
};
