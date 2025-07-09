import { constants } from "@/constants";
import axios from "axios";

const axiosToken = axios.create({
  baseURL: constants.apiURL,
  withCredentials: true,
});

axiosToken.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosToken;
