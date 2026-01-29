import { constants } from "@/constants";
import axios from "axios";

const axiosToken = axios.create({
  withCredentials: true,
});

axiosToken.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"] && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosToken;
