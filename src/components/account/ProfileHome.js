import axiosToken from "@/axios/tokenAxios";
import { constants } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import Button from "../Button";

const ProfileHome = () => {
  const router = useRouter();
  const { logout } = useUser();

  const loguserOut = async () => {
    await axiosToken.post(constants.apiURL + "/user/logout", {});
    await logout();
    router.push("sign-in");
  };
  return (
    <div className="flex flex-col gap-4">
      <Button className="max-w-max" onClick={loguserOut}>
        Log Out
      </Button>
    </div>
  );
};

export default ProfileHome;
