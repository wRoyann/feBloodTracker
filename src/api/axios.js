import axios from "axios";
import { getLocalStorage } from "@/utils/localStorage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getLocalStorage("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
