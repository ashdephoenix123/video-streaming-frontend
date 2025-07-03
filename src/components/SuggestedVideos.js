import { ListVideo } from "lucide-react";
import Image from "next/image";
import React from "react";
import Description from "./VideoBanner/Description";
import { suggestedVideos } from "@/mocks";
import { formatDistanceToNow } from "date-fns";

const SuggestedVideos = () => {
  let suggested = suggestedVideos.map((vid) => {
    return (
      <div key={vid.id} className="flex gap-2">
        <div className="relative h-24 w-full max-w-40 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src="/sample.jpg"
            alt="sample-image"
            fill
            className="object-cover"
          />
        </div>
        <Description
          title={vid.title}
          channelName={vid.channel.name}
          uploadDate={formatDistanceToNow(new Date(vid.uploadDate), {
            addSuffix: true,
          })}
        />
      </div>
    );
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg flex items-center gap-1">
        <ListVideo />
        Suggested Videos
      </h3>
      <div className="flex flex-col gap-2">{suggested}</div>
    </div>
  );
};

export default SuggestedVideos;
