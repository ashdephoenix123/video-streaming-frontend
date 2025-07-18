import SignedOutUI from "@/components/signed-out/LikedVideos";
import { constants } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";

const LikedVideos = ({ likedVideos, error }) => {
  const { user } = useUser();

  if (!user || (error && error[0] === 401)) {
    return <SignedOutUI />;
  }

  if (error) {
    return <p>{error[1]}</p>;
  }

  return <div>user logged in</div>;
};

export default LikedVideos;

export async function getServerSideProps({ req }) {
  try {
    const likedVideos = await axios.get(
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
        likedVideos: likedVideos.data,
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
