import { likeVideo } from "@/axios/api";
import axiosToken from "@/axios/tokenAxios";
import SignedOutUI from "@/components/signed-out/SavedVideos";
import VideoCard from "@/components/VideoCard";
import { constants } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

const menuItems = [{ icon: Trash2, label: "Remove", id: "save" }];

const WatchLater = ({ data, error }) => {
  const { user } = useUser();
  const router = useRouter();
  const [userSaved, setUserSaved] = useState(data?.savedVideos);
  const { mutate } = useMutation({
    mutationFn: async ({ videoId, action }) => {
      await likeVideo(user.userId, videoId, action, router);
      return { videoId, action };
    },
    onSuccess: ({ videoId, action }) => {
      if (action === "save") {
        setUserSaved((prev) => prev.filter((vid) => vid._id != videoId));
      }
    },
  });
  if (!user || (error && error[0] === 401)) {
    return <SignedOutUI />;
  }

  if (error) {
    return <p>{error[1]}</p>;
  }

  let noSavedVids = (
    <p className="italic text-neutral-400">
      Your saved videos will be available here.
    </p>
  );

  return (
    <div>
      <h1 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-1">
        Saved Videos
      </h1>
      <div className="space-y-4 mt-4 max-w-3xl">
        {userSaved.length > 0
          ? userSaved.map((vid) => (
              <VideoCard
                key={vid.id}
                vid={vid}
                uploader={{
                  uploaderName: data.userName,
                  uploaderAvatar: data.userAvatar,
                }}
                menuItems={menuItems}
                mutate={mutate}
              />
            ))
          : noSavedVids}
      </div>
    </div>
  );
};

export default WatchLater;

export async function getServerSideProps({ req }) {
  try {
    const response = await axiosToken.get(
      constants.frontendURL + "/user/savedVideos/user",
      {
        headers: {
          Cookie: req.headers.cookie,
        },
        withCredentials: true,
      }
    );

    return {
      props: {
        data: response.data || {},
      },
    };
  } catch (error) {
    return {
      props: {
        error: [error.status, error.response.data.message],
      },
    };
  }
}
