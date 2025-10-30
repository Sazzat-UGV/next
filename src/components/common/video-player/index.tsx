"use client";
import { Skeleton } from "@/components/ui";
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "@/components/ui/kibo-ui/video-player";
import { cn } from "@/lib";
import ReactPlayer from "react-player";

type PlayerType = "video" | "link";

interface PlayerProps {
  type?: PlayerType;
  video?: string;
  link?: string;
  thumbnail?: string;
  className?: string;
}

// // crossOrigin="anonymous"
//     preload="metadata"
//     autoPlay={true}
//     slot="media"
//     // controls={false}
//     // poster={thumbnail}
//     muted={false}
//     src={video}

// 1. Break down complex JSX into smaller, focused components
const VideoComponent = ({
  video,
  thumbnail,
  className,
}: Partial<PlayerProps>) => (
  <VideoPlayer
    className={cn(
      "overflow-hidden w-full h-[300px] md:h-[650px] rounded-lg border",
      className
    )}
  >
    <VideoPlayerContent
      // crossOrigin="anonymous"
      preload="metadata"
      autoPlay={true}
      slot="media"
      // controls={false}
      // poster={thumbnail}
      src={video}
    />
    <VideoPlayerControlBar>
      <VideoPlayerPlayButton />
      <VideoPlayerSeekBackwardButton />
      <VideoPlayerSeekForwardButton />
      <VideoPlayerTimeRange />
      <VideoPlayerTimeDisplay showDuration />
      <VideoPlayerMuteButton />
      <VideoPlayerVolumeRange />
    </VideoPlayerControlBar>
  </VideoPlayer>
);

// A more realistic component for the 'link' type, e.g., an iframe
const LinkComponent = ({ link, className }: Partial<PlayerProps>) => (
  <VideoPlayer
    className={cn(
      "overflow-hidden w-full h-[300px] md:h-[650px] rounded-lg border",
      className
    )}
  >
    <ReactPlayer
      slot="media"
      src={link}
      controls={true}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
    <VideoPlayerControlBar>
      <VideoPlayerPlayButton />
      <VideoPlayerSeekBackwardButton />
      <VideoPlayerSeekForwardButton />
      <VideoPlayerTimeRange />
      <VideoPlayerTimeDisplay showDuration />
      <VideoPlayerMuteButton />
      <VideoPlayerVolumeRange />
    </VideoPlayerControlBar>
  </VideoPlayer>
);

const SkeletonLoader = ({ className }: Partial<PlayerProps>) => (
  <div
    className={cn(
      "overflow-hidden w-full h-[300px] md:h-[650px] rounded-lg border",
      className
    )}
  >
    <Skeleton className="w-full h-full bg-blacks/5" />
  </div>
);

// 2. Main PlayerBox component is now cleaner and easier to understand
const PlayerBox = ({
  type,
  video,
  link,
  className,
  thumbnail,
}: PlayerProps) => {
  if (type === "video") {
    return (
      <VideoComponent
        video={video}
        thumbnail={thumbnail}
        className={className}
      />
    );
  }
  if (type === "link") {
    return <LinkComponent link={link} className={className} />;
  }
  return <SkeletonLoader className={className} />;
};

export default PlayerBox;
