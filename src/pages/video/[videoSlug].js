import Layout from "@/components/layouts";
import MainVideoPlayer from "@/components/MainVideoPlayer";
import SuggestedVideos from "@/components/SuggestedVideos";
import { constants } from "@/constants";
import React from "react";

const VideoName = ({ video, error }) => {
  if (error) {
    return <div> Error</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 rounded-lg shadow overflow-hidden">
        <MainVideoPlayer src={video} />
      </div>
      <div className="col-span-4 rounded-lg shadow overflow-hidden">
        <SuggestedVideos />
      </div>
    </div>
  );
};

VideoName.getLayout = function getLayout(page) {
  return <Layout variant="clean">{page}</Layout>;
};

export async function getServerSideProps({ params }) {
  try {
    const path = `${constants.apiURL}/video/${params.videoSlug}`;
    const res = await fetch(path);
    const video = await res.json();
    return { props: { video: "http://localhost:5000" + video.url } };
  } catch (error) {
    console.log(error);
    return { props: { error: "Failed to fetch URL" } };
  }
}

export default VideoName;
