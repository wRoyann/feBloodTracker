import { request } from "./request";

export const register = (payload) => {
  return request({
    url: "/register",
    method: "POST",
    data: payload,
  });
};

export const login = (payload) => {
  return request({
    url: "/login",
    method: "POST",
    data: payload,
  });
};

export const logout = () => {
  return request({
    url: "/logout",
    method: "POST",
  });
};

export const showOrganisasi = () => {
  return request({
    url: "/organisasi",
    method: "GET",
  });
};
