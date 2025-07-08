import { useRouter } from "next/router";
import React from "react";

const ProfileHome = () => {
  const router = useRouter();

  const loguserOut = () => {
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
