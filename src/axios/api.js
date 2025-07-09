import { constants } from "@/constants";
import axiosToken from "./tokenAxios";

export const getUserVideos = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axiosToken.get(
    constants.apiURL + `/user/videos/${user.userId}`,
    { withCredentials: true }
  );
  return response.data;
};
