import { api } from "./axios";

export const request = async ({
  url,
  method = "POST",
  data = null,
  params = null,
  headers = {},
}) => {
  const response = await api({
    url,
    method,
    data,
    params,
    headers,
  });

  return response.data;
};
