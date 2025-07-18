import SignedOutUI from "@/components/signed-out/SavedVideos";
import { constants } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";

const WatchLater = ({ savedVideos, error }) => {
  const { user } = useUser();

  if (!user || (error && error[0] === 401)) {
    return <SignedOutUI />;
  }

  if (error) {
    return <p>{error[1]}</p>;
  }

  return <>User Logged in</>;
};

export default WatchLater;

export async function getServerSideProps({ req }) {
  try {
    const savedVideos = await axios.get(
      constants.apiURL + "/user/savedVideos/user",
      {
        headers: {
          Cookie: req.headers.cookie,
        },
        withCredentials: true,
      }
    );

    return {
      props: {
        savedVideos: savedVideos.data,
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
