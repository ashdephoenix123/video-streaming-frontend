import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosToken from "./tokenAxios";

export const usePosts = () => {
  return useQuery({
    queryKey: ["all-videos"],
    queryFn: async () => {
      const response = await axiosToken.get(`/videos`);
      return response;
    },
  });
};

export const useSubscriptionStatus = ({ userId }) => {
  return useQuery({
    queryKey: ["subscription-status"],
    queryFn: async () => {
      const response = await axiosToken.post(`/user/subscribe/getStatus`, {
        userId,
      });
      return response;
    },
  });
};

export const useSubscribe = (callback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, subscriberId }) => {
      const res = await axiosToken.post(`/user/subscribe`, {
        userId,
        subscriberId,
      });
      return res;
    },
    onSuccess: (res) => {
      res.status === 201 ? callback(true) : callback(false);
      queryClient.invalidateQueries({
        queryKey: ["my-subscriptions"],
      });
    },
  });
};

export const useMySubscriptions = () => {
  return useQuery({
    queryKey: ["my-subscriptions"],
    queryFn: async () => {
      const response = await axiosToken.get(`/user/subscribe/mySubscriptions`);
      return response;
    },
  });
};

export const useSubDetails = ({ userId }) => {
  return useQuery({
    queryKey: ["sub-details", userId],
    queryFn: async () => {
      const response = await axiosToken.post(
        `/user/subscribe/getSubscriptionDetail`,
        { userId },
      );
      return response;
    },
    enabled: !!userId,
  });
};

export const getAllVideos = async () => {
  try {
    const res = await axiosToken.get(`/videos`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getUserVideos = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await axiosToken.get(`/user/videos/${user.userId}`);
  return response.data;
};

// action = "like" | "save"
export const likeVideo = async (userId, mediaId, action, router) => {
  try {
    const body = { userId, mediaId, action };
    const res = await axiosToken.post(`/user/likeOrSave`, body);

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
    await axiosToken.post(`/user/history/`, {
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
