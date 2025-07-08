import { constants } from "@/constants";
import axiosToken from "./tokenAxios";

export const getUserVideos = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axiosToken(
    constants.apiURL + `/user/videos/${user.userId}`
  );
  return response.data;
};
