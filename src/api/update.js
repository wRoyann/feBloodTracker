import { request } from "./request";

export const updateStatus = (id, status) => {
  return request({
    url: `/update-status-organisasi/${id}`,
    method: "PUT",
    data: {
      status,
    },
  });
};
