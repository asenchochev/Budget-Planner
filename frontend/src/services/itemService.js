import api from "./api";

export const getItems = async (params = {}) => {
  const { data } = await api.get("/items", { params });
  return data.data;
};

export const createItem = async (item) => {
  const { data } = await api.post("/items", item);
  return data.data;
};

export const updateItem = async (id, item) => {
  const { data } = await api.put(`/items/${id}`, item);
  return data.data;
};

export const deleteItem = async (id) => {
  const { data } = await api.delete(`/items/${id}`);
  return data.data;
};

export const togglePurchased = async (id) => {
  const { data } = await api.patch(`/items/${id}/purchase`);
  return data.data;
};
