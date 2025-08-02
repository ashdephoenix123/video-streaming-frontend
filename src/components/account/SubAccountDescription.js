import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";
import { useSubscribe } from "@/axios/api";

const SubAccountDescription = ({ user, preview }) => {
  const { user: loggedInUser } = useUser();
  const [isSubscribed, setIsSubscribed] = useState(true);
  const { mutate } = useSubscribe(setIsSubscribed);

  const updateSubscription = async () => {
    mutate({ userId: user?.userId, subscriberId: loggedInUser?.userId });
  };

  return (
    <div className="flex gap-6">
      <div className="relative group w-24 h-24 md:w-[150px] md:h-[150px]">
        <Image
          src={preview}
          alt={`${user?.username}'s avatar`}
          fill
          priority
          className="object-cover rounded-full"
        />
      </div>
      <div className="space-y-2 flex flex-col justify-center">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight">
          {user?.username}
        </h1>
        <p className="text-xs text-neutral-400">&#x2022; {user?.email} </p>
        <Button
          onClick={updateSubscription}
          variant={isSubscribed ? "secondary" : "tertiary"}
          className={cn(
            "rounded-full text-xs font-medium self-start py-1.5 leading-6"
          )}
        >
          Subscribe{isSubscribed ? "d" : ""}
        </Button>
      </div>
    </div>
  );
};

export default SubAccountDescription;
