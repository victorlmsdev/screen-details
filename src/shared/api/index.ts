import axios from "axios";
import { BASE_URL, API_READ_ACCESS_TOKEN } from "@env";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(options => {
  options.headers.Authorization = `Bearer ${API_READ_ACCESS_TOKEN}`;
  if (__DEV__) console.log(options.url);
  return options;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (__DEV__) console.log(error.response.data);
  },
);

export default api;
