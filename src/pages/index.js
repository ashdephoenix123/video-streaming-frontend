import VideoPlayer from "@/components/VideoPlayer";
import { constants } from "@/constants";
import axios from "axios";
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
      <h3 className="text-sm mt-2 font-medium">{video.title}</h3>
      <p className="text-xs">{video.description}</p>
    </Link>
  ));

  return <div className="grid grid-cols-3 gap-x-4 gap-y-8">{videos}</div>;
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${constants.apiURL}/videos`);
    if (res.statusText != "OK") {
      throw new Error("Error fetching videos");
    }
    return { props: { allVideos: res.data } };
  } catch (error) {
    return { props: { error: "Failed to Fetch!" } };
  }
}
