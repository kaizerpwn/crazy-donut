import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    return {
      ...config,
      url: `${http.defaults.baseURL}${config.url}`,
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
