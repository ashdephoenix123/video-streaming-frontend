import SignedOutUI from "@/components/signed-out/LikedVideos";
import VideoCard from "@/components/VideoCard";
import { constants } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";

const LikedVideos = ({ data, error }) => {
  const { user } = useUser();

  if (!user || (error && error[0] === 401)) {
    return <SignedOutUI />;
  }

  if (error) {
    return <p>{error[1]}</p>;
  }

  let userLiked = data.likedVideos;
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
                user={{ username: data.userName, userAvatar: data.userAvatar }}
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
        data: response.data || [],
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
