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
        <MediaPlayButton className="p-2" />
        <MediaMuteButton className="p-2" />
        <MediaVolumeRange className="p-2 hover:bg-transparent" />
        <MediaTimeDisplay showDuration className="p-2 hover:bg-transparent" />
        <div className="flex-1" />
        <MediaPlaybackRateButton className="p-2" />
        <MediaFullscreenButton className="p-2" />
      </MediaControlBar>
    </MediaController>
  );
}
