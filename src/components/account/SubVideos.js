import { formatDistance } from "date-fns";
import Link from "next/link";
import Loading from "../Loading";
import VideoPlayer from "../VideoPlayer";
import Image from "next/image";
import { defaults } from "@/constants";

const SubVideos = ({ data }) => {
  const videos = data?.map((video) => (
    <Link key={video._id} href={`/video/${video.slug}`} className="space-y-1">
      <div className="relative w-full h-52 rounded-sm overflow-hidden">
        <Image src={defaults.image} alt="" fill objectFit="cover" />
        {/* <VideoPlayer src={video.hlsUrl} /> */}
      </div>
      <h3 className="text-sm font-medium">{video.title}</h3>
      <p className="text-xs text-neutral-400">
        {formatDistance(new Date(video.createdAt), new Date(), {
          addSuffix: true,
        })}
      </p>
    </Link>
  ));

  const renderVideos = (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos}
    </div>
  );
  const noVideoMessage = (
    <p className="text-xs text-neutral-400">
      No media uplaoded yet! Please upload a video to view here.
    </p>
  );

  return <div>{videos.length > 0 ? renderVideos : noVideoMessage}</div>;
};

export default SubVideos;
