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

export const showGolonganDarah = () => {
  return request({
    url: "/golongan-darah",
    method: "GET",
  });
};

export const showLocation = () => {
  return request({
    url: "/lokasi-donor",
    method: "GET",
  });
};

export const createGolonganDarah = (payload) => {
  return request({
    url: "/golongan-darah",
    method: "POST",
    data: payload,
  });
};

export const addLocation = (payload) => {
  return request({
    url: "/lokasi-donor",
    method: "POST",
    data: payload,
  });
};
