import VideoPlayer from "@/components/VideoPlayer";
import { constants } from "@/constants";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Home({ allVideos, error }) {
  if (error) {
    return <div>Error</div>;
  }

  let videos = allVideos.map((video) => (
    <Link key={video._id} href={`/video/${video.slug}`}>
      <div>
        <VideoPlayer src={video.hlsUrl} />
      </div>
      <div className="flex gap-2 mt-3 text-sm">
        <Image
          src={video.userId?.avatarURL ?? "/default-user.jpg"}
          alt="default user image"
          width={35}
          height={35}
          className="rounded-full self-baseline"
        />
        <div>
          <h3 className="tracking-wide">{video.title}</h3>
          <p className="text-neutral-400">{video.userId?.username}</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-8">
      {videos}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${constants.apiURL}/videos`);
    if (res.status != 200) {
      throw new Error("Error fetching videos");
    }
    return { props: { allVideos: res.data } };
  } catch (error) {
    return { props: { error: "Failed to Fetch!" } };
  }
}
