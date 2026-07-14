import axios from "axios";
import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";

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

const AUTH_PATHS = ["/login", "/register"];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      !AUTH_PATHS.some((p) => error.config?.url?.includes(p))
    ) {
      removeLocalStorage("token");
      removeLocalStorage("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
