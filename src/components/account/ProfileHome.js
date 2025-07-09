import axiosToken from "@/axios/tokenAxios";
import { constants } from "@/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const ProfileHome = () => {
  const router = useRouter();

  const loguserOut = async () => {
    await axiosToken.post(constants.apiURL + "/user/logout", {});
    localStorage.removeItem("user");
    router.push("sign-in");
  };
  return (
    <div>
      <button onClick={loguserOut}>Log out</button>
    </div>
  );
};

export default ProfileHome;
