import VideoPlayer from "@/components/VideoPlayer";
import { constants } from "@/constants";
import Link from "next/link";

export default function Home({ allVideos, error }) {
  if (error) {
    return <div>Error</div>;
  }

  let videos = allVideos.map((video) => (
    <Link key={video.slug} href={`/video/${video.slug}`}>
      <div>
        <VideoPlayer src={"http://localhost:5000" + video.url} />
      </div>
      <h3 className="text-sm mt-2 font-medium">
        {video.slug.replace(/-/g, " ")}
      </h3>
      <p className="text-xs">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys
      </p>
    </Link>
  ));

  return <div className="grid grid-cols-3 gap-4">{videos}</div>;
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`${constants.apiURL}/videos`);
    const allVideos = await res.json();
    return { props: { allVideos } };
  } catch (error) {
    return { props: { error: "Failed to Fetch!" } };
  }
}
