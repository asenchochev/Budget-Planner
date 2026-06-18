import api from "./api";

export const getDashboardStats = async (month) => {
  const { data } = await api.get("/analytics/dashboard", { params: { month } });
  return data.data;
};

export const getSeasonalProducts = async (season) => {
  const { data } = await api.get("/seasonal", { params: { season } });
  return data.data;
};

export const getHerbs = async () => {
  const { data } = await api.get("/herbs");
  return data;
};
