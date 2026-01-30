import { defaults } from "@/constants";
import Image from "next/image";

const MediaPreview = ({ thumbnail, mediaURL }) => {
  const previewURL = thumbnail ? thumbnail : defaults.video;

  return (
    <div className="relative w-full h-60 lg:h-52 overflow-hidden rounded-sm">
      <Image
        src={previewURL}
        fill
        objectFit="cover"
        alt={thumbnail + "-thumbnail-image"}
      />

      {/* Below for advance effects */}
      {/* {!isHovered ? (
        <Image src="/default-media.jpg" fill objectFit="cover" />
      ) : (
        <VideoPlayer src={mediaURL} />
      )} */}
    </div>
  );
};

export default MediaPreview;
