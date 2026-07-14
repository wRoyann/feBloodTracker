import { request } from "./request";

export const showPermintaanDarah = (params) => {
  return request({
    url: "/permintaan-darurat",
    method: "GET",
    params,
  });
};

export const createPermintaanDarah = (payload) => {
  return request({
    url: "/permintaan-darurat",
    method: "POST",
    data: payload,
  });
};
