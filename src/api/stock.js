import { request } from "./request";

export const showStockDarah = (params) => {
  return request({
    url: "/stok-darah",
    method: "GET",
    params,
  });
};

export const updateStockDarah = (id, payload) => {
  return request({
    url: `/stok-darah/${id}`,
    method: "PUT",
    data: payload,
  });
};
