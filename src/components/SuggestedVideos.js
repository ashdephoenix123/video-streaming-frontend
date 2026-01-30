import { usePosts } from "@/axios/api";
import { formatDistanceToNow } from "date-fns";
import { ListVideo } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Loading from "./Loading";
import Description from "./VideoBanner/Description";
import VideoPlayer from "./VideoPlayer";
import { useRouter } from "next/router";
import { defaults } from "@/constants";

const SuggestedVideos = () => {
  const { status, data, error, isFetching } = usePosts();
  const { query } = useRouter();
  const currentSlug = query.videoSlug;

  let fetchingVideos = (
    <div className="flex justify-center mt-12">
      <Loading />
    </div>
  );

  // Advacnce feature for future
  // let display = (videoURL) =>
  //   !videoURL ? (
  //     <Image
  //       src="/placeholder.jpg"
  //       alt="sample-image"
  //       fill
  //       className="object-cover"
  //     />
  //   ) : (
  //     <VideoPlayer src={videoURL} className="w-full h-full object-cover" />
  //   );

  let suggested = () =>
    data.data.map((vid) => {
      if (vid.slug != currentSlug) {
        return (
          <Link href={vid.slug} key={vid.slug} className="flex gap-2">
            <div className="relative h-20 lg:h-24 lg:24 w-full max-w-32 lg:max-w-40 flex-shrink-0 rounded-sm overflow-hidden">
              <Image
                src={vid.thumbnailUrl || defaults.video}
                alt="sample-image"
                fill
                className="object-cover"
              />
            </div>
            <Description
              title={vid.title}
              channelName={vid.userId.username}
              uploadDate={formatDistanceToNow(new Date(vid.createdAt), {
                addSuffix: true,
              })}
            />
          </Link>
        );
      }
    });

  return (
    <div className="space-y-4">
      <h3 className="text-lg flex items-center gap-1">
        <ListVideo />
        Suggested Videos
      </h3>
      {isFetching && fetchingVideos}
      {!isFetching && error && <p>Failed to get videos!</p>}
      {status === "success" && data?.data && data?.data.length > 0 && (
        <div className="flex flex-col gap-2">{suggested()}</div>
      )}
    </div>
  );
};

export default SuggestedVideos;
