import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Bookmark, ThumbsUp } from "lucide-react";
import axiosToken from "@/axios/tokenAxios";
import { constants, messages } from "@/constants";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useUser } from "@/contexts/UserContext";
import { saveHistory, useSubscribe, useSubscriptionStatus } from "@/axios/api";
import { cn } from "@/lib/utils";

const VideoDescription = ({ media }) => {
  const router = useRouter();
  const { user } = useUser();
  const { mutate } = useSubscribe();
  const { data, status } = useSubscriptionStatus({
    userId: media.userId._id,
  });
  const [isSubscribed, setIsSubscribed] = useState(null);

  useEffect(() => {
    if (status === "success" && data?.data) {
      setIsSubscribed(data.data.subscribed);
    }
  }, [data, status]);

  const checkAuth = () => {
    if (!user) router.push("/sign-in");
  };

  const likeVideo = async () => {
    checkAuth();
    try {
      const body = { userId: user.userId, mediaId: media._id, action: "like" };
      const res = await axiosToken.post(
        constants.apiURL + `/user/likeOrSave`,
        body
      );

      if (res.status === 200) {
        console.log(res);
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.status === 401) {
        router.replace("/sign-in");
        return;
      }
      console.log(error);
      // toast.error(messages.error);
    }
  };

  const saveVideo = async () => {
    checkAuth();
    try {
      const body = { userId: user.userId, mediaId: media._id, action: "save" };
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
    }
  };

  const updateSubscription = async () => {
    if (!user) {
      checkAuth();
      return;
    }
    setIsSubscribed((prev) => !prev);
    mutate({ userId: media?.userId._id, subscriberId: user?.userId });
  };

  useEffect(() => {
    if (user?.userId && media?._id) {
      saveHistory(user.userId, media._id);
    }
  }, [user?.userId, media?._id]);

  return (
    <div className="my-4">
      <h1 className="tracking-tight text-lg font-semibold">{media.title}</h1>
      <div className="mt-3 text-sm space-y-4 lg:space-y-0 lg:flex lg:items-center">
        <div className="flex gap-2">
          <Image
            src={media.userId?.avatarURL ?? "/default-user.jpg"}
            alt="default user image"
            width={35}
            height={35}
            className="rounded-full self-baseline"
          />
          <div>
            <h2 className="tracking-tight text-base font-semibold">
              {media.userId?.username}
            </h2>
            <p className="text-neutral-400 text-xs">Subscriber count</p>
          </div>
          {media?.userId._id !== user?.userId && (
            <Button
              onClick={updateSubscription}
              variant={isSubscribed ? "secondary" : "tertiary"}
              className={cn(
                "rounded-full text-xs font-medium lg:ml-4 self-center py-1.5 leading-6 ml-auto"
              )}
            >
              Subscribe{isSubscribed ? "d" : ""}
            </Button>
          )}
        </div>
        <div className="flex lg:ml-auto">
          <Button
            onClick={likeVideo}
            variant="tertiary"
            className="items-center gap-1 rounded-full text-xs font-medium self-center py-1.5 leading-6"
          >
            <div className="flex items-center gap-1">
              <ThumbsUp size={18} />
              <span className="">Like</span>
            </div>
          </Button>
          <Button
            onClick={saveVideo}
            variant="tertiary"
            className="items-center gap-1 rounded-full text-xs font-medium ml-2 self-center py-1.5 leading-6"
          >
            <div className="flex items-center gap-1">
              <Bookmark size={18} />
              <span className="">Save to Watch List</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoDescription;
