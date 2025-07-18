import { likeVideo } from "@/axios/api";
import SignedOutUI from "@/components/signed-out/LikedVideos";
import VideoCard from "@/components/VideoCard";
import { constants } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Timer, Trash2 } from "lucide-react";

const menuItems = [
  { icon: Trash2, label: "Remove", id: "like" },
  { icon: Timer, label: "Add to Watch Later", id: "save" },
];

const LikedVideos = ({ data, error }) => {
  const { user } = useUser();
  const router = useRouter();
  const [userLiked, setUserLiked] = useState(data?.likedVideos);
  const { mutate } = useMutation({
    mutationFn: async ({ videoId, action }) => {
      await likeVideo(user.userId, videoId, action, router);
      return { videoId, action };
    },
    onSuccess: ({ videoId, action }) => {
      if (action === "like") {
        setUserLiked((prev) => prev.filter((vid) => vid._id != videoId));
      }
    },
  });

  if (!user || (error && error[0] === 401)) {
    return <SignedOutUI />;
  }

  if (error) {
    return <p>{error[1]}</p>;
  }

  let noLikedVids = (
    <p className="italic text-neutral-400">
      Your liked videos will be available here.
    </p>
  );

  return (
    <div>
      <h1 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-1">
        Liked Videos
      </h1>
      <div className="space-y-4 mt-4 max-w-3xl">
        {userLiked.length > 0
          ? userLiked.map((vid) => (
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
          : noLikedVids}
      </div>
    </div>
  );
};

export default LikedVideos;

export async function getServerSideProps({ req }) {
  try {
    const response = await axios.get(
      constants.apiURL + "/user/likedVideos/user",
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
