import VideoPlayer from "@/components/VideoPlayer";
import { formatDistanceToNow } from "date-fns";
import { EllipsisVertical, Timer, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const menuItems = [
  { icon: Trash2, label: "Remove", id: "like" },
  { icon: Timer, label: "Add to Watch Later", id: "save" },
];

const VideoCard = ({ vid, uploader, mutate }) => {
  const [show, setShow] = useState(false);

  const itemAction = async (action) => {
    mutate({ videoId: vid._id, action });
    setShow(false);
  };

  let dropdownContent = (
    <div className="absolute right-0 top-6 bg-neutral-700 rounded-lg py-1">
      <ul className="text-xs min-w-24 text-center">
        {menuItems.map((item) => (
          <li
            onClick={() => itemAction(item.id)}
            key={item.label}
            className="px-4 py-2.5 border-b last:border-0 border-b-neutral-600 hover:bg-neutral-800 cursor-pointer whitespace-nowrap transition-all duration-300 flex gap-2 items-center"
          >
            <item.icon size={18} /> {item.label}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div
      key={vid}
      className="border border-neutral-700 rounded-lg overflow-hidden flex"
    >
      <div className="w-80 relative h-44 overflow-hidden">
        {vid.hlsUrl ? (
          <VideoPlayer src={vid.hlsUrl} className="w-full h-full" />
        ) : (
          <Image
            src="/placeholder.jpg"
            alt="preview"
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-4 flex gap-8 flex-1">
        <div className="flex-1 space-y-1">
          <h2>{vid.title}</h2>
          <p className="text-neutral-400">{vid.description}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <Image
              src={uploader.uploaderAvatar || "/default-user.jpg"}
              alt="default user image"
              width={30}
              height={30}
              className="rounded-full self-baseline"
            />
            <p className="text-neutral-400">
              {uploader.uploaderName} &#x2022;{" "}
            </p>
            <p className="text-neutral-400 text-xs">
              {formatDistanceToNow(new Date(vid.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        <div className="relative">
          <EllipsisVertical
            size={20}
            onClick={() => setShow((prev) => !prev)}
            className="cursor-pointer"
          />
          {show && dropdownContent}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
