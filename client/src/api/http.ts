import axios from "axios";

const http = axios.create({
  baseURL: "https://donut-api.polodev.net",
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default http;
