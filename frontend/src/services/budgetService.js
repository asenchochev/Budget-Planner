import api from "./api";

export const getBudget = async (month) => {
  const { data } = await api.get("/budget", { params: { month } });
  return data.data;
};

export const setBudget = async (amount, month) => {
  const { data } = await api.post("/budget", { amount, month });
  return data.data;
};

export const getBudgetHistory = async () => {
  const { data } = await api.get("/budget/history");
  return data.data;
};
