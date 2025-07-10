import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import React from "react";

const AccountDescription = () => {
  const { user } = useUser();

  return (
    <div className="flex gap-6">
      <Image
        src="/akash-sarki.jpg"
        alt="user-avatar"
        width={150}
        height={150}
        className="rounded-full"
      />
      <div className="space-y-2 flex flex-col justify-center">
        <h1 className="text-3xl font-bold tracking-tight">{user?.username}</h1>
        <p className="text-xs text-neutral-400">&#x2022; {user?.email} </p>
      </div>
    </div>
  );
};

export default AccountDescription;
