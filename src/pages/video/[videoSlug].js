import Layout from "@/components/layouts";
import MainVideoPlayer from "@/components/MainVideoPlayer";
import SuggestedVideos from "@/components/SuggestedVideos";
import VideoDescription from "@/components/VideoDescription";
import { constants } from "@/constants";
import axios from "axios";
import React from "react";

const VideoName = ({ video, error }) => {
  if (error) {
    return <div> Error</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 rounded-lg shadow overflow-hidden">
        <MainVideoPlayer media={video} />
        <VideoDescription media={video} />
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
    const res = await axios.get(path);
    return { props: { video: res.data } };
  } catch (error) {
    console.log(error);
    return { props: { error: "Failed to fetch URL" } };
  }
}

export default VideoName;
