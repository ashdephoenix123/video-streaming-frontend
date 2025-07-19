import { removeVidFromHistory } from "@/axios/api";
import SignedOutUI from "@/components/signed-out/history";
import VideoCard from "@/components/VideoCard";
import { constants } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const menuItems = [{ icon: Trash2, label: "Remove", id: "history" }];

const History = ({ media, error }) => {
  const { user } = useUser();
  const [historyVideos, setHistoryVideos] = useState(media?.historyVideos);

  const { mutate } = useMutation({
    mutationFn: async ({ videoId }) => {
      await removeVidFromHistory(videoId);
      return { videoId };
    },
    onSuccess: ({ videoId }) => {
      setHistoryVideos((prev) => prev.filter((vid) => vid._id != videoId));
    },
  });

  if (!user || (error && error[0] === 401)) {
    return <SignedOutUI />;
  }

  if (error) {
    return <p>{error[1]}</p>;
  }

  let noHistoryVids = (
    <p className="italic text-neutral-400">
      Your watched history will be available here.
    </p>
  );

  return (
    <div>
      <h1 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-1">
        History
      </h1>
      <div className="space-y-4 mt-4 max-w-3xl">
        {historyVideos.length > 0
          ? historyVideos.map((vid) => (
              <VideoCard
                key={vid.id}
                vid={vid}
                uploader={{
                  uploaderName: media.userName,
                  uploaderAvatar: media.userAvatar,
                }}
                menuItems={menuItems}
                mutate={mutate}
              />
            ))
          : noHistoryVids}
      </div>
    </div>
  );
};

export default History;

export async function getServerSideProps({ req }) {
  try {
    const response = await axios.get(constants.apiURL + "/user/history/user", {
      headers: {
        Cookie: req.headers.cookie,
      },
      withCredentials: true,
    });

    return {
      props: {
        media: response.data || {},
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
