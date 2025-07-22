import { useUser } from "@/contexts/UserContext";
import { Atom, CircleUserRound, Tv, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { projectName } from "@/constants";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="h-16 flex items-center justify-between">
      <Link href="/">
        <h1 className="text-lg font-medium flex gap-2">
          <Tv size={25} />
          {projectName}
        </h1>
      </Link>

      <Link href="/account">
        {user && user?.avatarURL ? (
          <Image
            src={user?.avatarURL}
            alt="user-image"
            width={30}
            height={30}
            className="rounded-full"
          />
        ) : (
          <CircleUserRound size={30} />
        )}
      </Link>
    </div>
  );
};

export default Navbar;
