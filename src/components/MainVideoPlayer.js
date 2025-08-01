import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import ReactPlayer from "react-player";

export default function MainVideoPlayer({ media }) {
  const { hlsUrl } = media;

  return (
    <MediaController
      style={{
        width: "100%",
        aspectRatio: "16/9",
      }}
    >
      <ReactPlayer
        autoPlay
        slot="media"
        src={hlsUrl}
        controls={false}
        style={{
          width: "100%",
          height: "100%",
          "--controls": "none",
        }}
      ></ReactPlayer>

      <div slot="centered-chrome" className="lg:hidden">
        <media-play-button></media-play-button>
      </div>

      <div className="hidden lg:block w-full">
        <MediaControlBar className="w-full">
          <MediaTimeRange className="bg-transparent" />
        </MediaControlBar>
      </div>
      <MediaControlBar className="hidden lg:flex gap-0">
        <MediaPlayButton className="p-2 bg-transparent" />
        <MediaMuteButton className="p-2 bg-transparent" />
        <MediaVolumeRange className="p-2 bg-transparent" />
        <MediaTimeDisplay showDuration className="p-2 bg-transparent" />
        <MediaPlaybackRateButton className="p-2 bg-transparent ml-auto " />
        <MediaFullscreenButton className="p-2 bg-transparent" />
      </MediaControlBar>
    </MediaController>
  );
}
