// components/VideoPlayer.jsx
import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function MainVideoPlayer({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, [src]);

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
