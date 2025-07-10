import axiosToken from "@/axios/tokenAxios";
import { constants } from "@/constants";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const ProfileHome = () => {
  const router = useRouter();
  const { logout } = useUser();

  const loguserOut = async () => {
    await axiosToken.post(constants.apiURL + "/user/logout", {});
    await logout();
    router.push("sign-in");
  };
  return (
    <div>
      <button onClick={loguserOut}>Log out</button>
    </div>
  );
};

export default ProfileHome;
