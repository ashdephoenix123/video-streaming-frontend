import { fetchHistory } from "@/axios/api";
import axiosToken from "@/axios/tokenAxios";
import SignedOutUI from "@/components/signed-out/history";
import { constants } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import { useEffect } from "react";

const History = ({ data }) => {
  console.log(data);
  const { user } = useUser();

  // const videosHistory = async () => {
  //   const res = await fetchHistory();
  //   console.log(res);
  // };

  // useEffect(() => {
  //   videosHistory();
  // }, []);

  if (!user) {
    return <SignedOutUI />;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-6">
      Your history will be available here.
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
        data: response.data || [],
      },
    };
  } catch (error) {
    return {
      props: {
        error: "error",
      },
    };
  }
}
