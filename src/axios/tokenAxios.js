import { constants } from "@/constants";
import axios from "axios";

const axiosToken = axios.create({
  baseURL: constants.apiURL,
});

axiosToken.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");
    const token = JSON.parse(userDetails).token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

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
