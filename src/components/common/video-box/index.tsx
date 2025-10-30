import { VideoCard } from "@/components/reuseable/video-card";
import SeeNav from "../see-nav";

export const videos = [
  {
    id: "1",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: true,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "2",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: true,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "3",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: true,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "8",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: false,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "4",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: false,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "5",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: false,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "6",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: false,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "7",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: false,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "9",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: false,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "10",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: false,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "11",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: false,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
  {
    id: "12",
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: false,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  },
];

export default function VideoBox() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.slice(0, 4).map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
      <SeeNav title="Beauty esthetics" href="/video-all/beauty-esthetics" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.slice(0, 4).map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
      <SeeNav
        title="Restaurant & Catering"
        href="/video-all/beauty-esthetics"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.slice(0, 4).map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}
