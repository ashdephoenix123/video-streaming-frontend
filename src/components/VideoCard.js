import VideoPlayer from "@/components/VideoPlayer";
import { formatDistanceToNow } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { defaults } from "@/constants";

const VideoCard = ({ vid, uploader, menuItems, mutate }) => {
  const [show, setShow] = useState(false);

  const itemAction = async (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    mutate({ videoId: vid._id, action });
    setShow(false);
  };

  const handleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShow((prev) => !prev);
  };

  let dropdownContent = (
    <div className="absolute right-0 top-6 bg-neutral-700 rounded-sm py-1">
      <ul className="text-xs min-w-24 text-center">
        {menuItems.map((item) => (
          <li
            onClick={(e) => itemAction(e, item.id)}
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
    <Link
      href={"/video/" + vid?.slug}
      className="border border-neutral-700 rounded-sm overflow-hidden flex flex-col md:flex-row"
    >
      <div className="w-full md:w-64 relative h-44 overflow-hidden">
        <Image
          src={vid?.thumbnailUrl || defaults.video}
          alt="preview"
          fill
          className="object-cover"
        />

        {/* {vid.hlsUrl ? (
          <VideoPlayer
            src={vid.hlsUrl}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src="/placeholder.jpg"
            alt="preview"
            fill
            className="object-cover"
          />
        )} */}
      </div>
      <div className="p-4 flex gap-8 flex-1">
        <div className="flex-1 space-y-1">
          <h2>{vid.title}</h2>
          <p className="text-neutral-400 line-clamp-4">{vid.description}</p>
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
            onClick={handleMenu}
            className="cursor-pointer"
          />
          {show && dropdownContent}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
