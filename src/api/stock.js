import { request } from "./request";

export const showStockDarah = () => {
  return request({
    url: "/stok-darah",
    method: "GET",
  });
};

export const updateStockDarah = (id, payload) => {
  return request({
    url: `/stok-darah/${id}`,
    method: "PUT",
    data: payload,
  });
};
