import { request } from "./request";

export const register = (payload) => {
  return request({
    url: "/register",
    method: "POST",
    data: payload,
  });
};
