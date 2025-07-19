import { constants } from "@/constants";
import axiosToken from "./tokenAxios";
import toast from "react-hot-toast";

export const getUserVideos = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axiosToken.get(
    constants.apiURL + `/user/videos/${user.userId}`
  );
  return response.data;
};

// action = "like" | "save"
export const likeVideo = async (userId, mediaId, action, router) => {
  try {
    const body = { userId, mediaId, action };
    const res = await axiosToken.post(
      constants.apiURL + `/user/likeOrSave`,
      body
    );

    if (res.status === 200) {
      toast.success(res.data.message);
    }
  } catch (error) {
    if (error.status === 401) {
      router.replace("/sign-in");
      return;
    }
    console.log(error);
    toast.error(messages.error);
  }
};

export const saveHistory = async (userId, videoId) => {
  try {
    if (!userId) return;
    await axiosToken.post(constants.apiURL + `/user/history/`, {
      userId,
      videoId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchHistory = async () => {
  const res = await axiosToken.get(`/user/history/user`);
  return res;
};

export const removeVidFromHistory = async (videoId) => {
  try {
    await axiosToken.post(`/user/history/remove`, {
      videoId,
    });
  } catch (error) {
    toast.error(messages.error);
  }
};
