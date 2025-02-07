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
