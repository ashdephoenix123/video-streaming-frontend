// components/VideoPlayer.jsx
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { cn } from "@/lib/utils";

export default function VideoPlayer({ src, className = "" }) {
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);

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

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 200); // 1 second = 1000 ms
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="metadata"
      className={cn(
        "w-full aspect-video rounded-lg shadow cursor-pointer",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
