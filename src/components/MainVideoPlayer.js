// components/VideoPlayer.jsx
import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function MainVideoPlayer({ media }) {
  const videoRef = useRef(null);
  const { hlsUrl } = media;

  useEffect(() => {
    const video = videoRef.current;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, [media]);

  return (
    <video
      autoPlay
      controls
      ref={videoRef}
      playsInline
      preload="metadata"
      className="w-full aspect-video cursor-pointer"
    />
  );
}
