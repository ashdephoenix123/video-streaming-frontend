import Image from "next/image";
import React from "react";
import Button from "./Button";

const VideoDescription = ({ media }) => {
  return (
    <div className="my-4">
      <h1 className="tracking-tight text-lg font-semibold">{media.title}</h1>
      <div className="flex gap-2 mt-3 text-sm">
        <Image
          src={media.userId?.avatarURL ?? "/default-user.jpg"}
          alt="default user image"
          width={35}
          height={35}
          className="rounded-full self-baseline"
        />
        <div>
          <h2 className="tracking-tight text-base font-semibold">
            {media.userId?.username}
          </h2>
          <p className="text-neutral-400 text-xs">Subscriber count</p>
        </div>
        <Button className="bg-white rounded-full text-black text-xs font-medium ml-2 self-center py-1.5">
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default VideoDescription;
