import Image from "next/image";
import React, { useEffect } from "react";
import Button from "./Button";
import { Bookmark, ThumbsUp } from "lucide-react";
import axiosToken from "@/axios/tokenAxios";
import { constants, messages } from "@/constants";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useUser } from "@/contexts/UserContext";
import { saveHistory } from "@/axios/api";

const VideoDescription = ({ media }) => {
  const router = useRouter();
  const { user } = useUser();

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

  useEffect(() => {
    if (user?.userId && media?._id) {
      saveHistory(user.userId, media._id);
    }
  }, [user?.userId, media?._id]);

  return (
    <div className="my-4">
      <h1 className="tracking-tight text-lg font-semibold">{media.title}</h1>
      <div className="flex gap-2 mt-3 text-sm">
        <Image
          src={media.userId?.avatarURL ?? "/default-user.jpg"}
          alt="default user image"
          width={35}
          height={35}
          className="rounded-full self-baseline"
        />
        <div className="flex items-center w-full">
          <div>
            <h2 className="tracking-tight text-base font-semibold">
              {media.userId?.username}
            </h2>
            <p className="text-neutral-400 text-xs">Subscriber count</p>
          </div>
          {/* <Button
            variant="secondary"
            className="rounded-full text-xs font-medium ml-4 self-center py-1.5 leading-6"
          >
            Subscribe
          </Button> */}
          <div className="ml-auto flex">
            <Button
              onClick={likeVideo}
              variant="tertiary"
              className="items-center gap-1 rounded-full text-xs font-medium ml-2 self-center py-1.5"
            >
              <div className="flex items-center gap-1">
                <ThumbsUp size={18} />
                <span className="hidden md:block">Like</span>
              </div>
            </Button>
            <Button
              onClick={saveVideo}
              variant="tertiary"
              className="items-center gap-1 rounded-full text-xs font-medium ml-2 self-center py-1.5"
            >
              <div className="flex items-center gap-1">
                <Bookmark size={18} />
                <span className="hidden md:block">Save</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDescription;
