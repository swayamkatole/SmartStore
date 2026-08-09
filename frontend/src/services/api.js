import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "";

const api = axios.create({ baseURL: `${BASE_URL}/api` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
};

export const productsApi = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
  search: (name) => api.get(`/products/search?name=${name}`),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const ordersApi = {
  create: (data) => api.post("/orders", data),
  getByUser: (userId) => api.get(`/orders/user/${userId}`),
};

export default api;