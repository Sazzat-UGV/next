import Link from "next/link";
import Avatars from "../avater";
import FavIcon from "@/icon/admin/favIcon";
import { ImgBox } from "@/components/common/admin/reuseable";
import ReactPlayer from "react-player";
import { cn } from "@/lib";
import { useState } from "react";

export function VideoCard({ item, className, imgStyle }: any) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const {
    id,
    title,
    thumbnail,
    user,
    views_count_formated,
    created_at_format,
    is_promoted,
    video,
    type,
    link,
  } = item || {};

  const handleVideoHover = (id: string) => {
    setActiveVideo(id);  
  };

  const handleVideoEnd = () => {
    setActiveVideo(null); 
  };

  return (
    <div className={className}>
      <Link href={`/video/${id}`}>
        <div
          className="relative group"
          onMouseEnter={() => handleVideoHover(id)}  
          onMouseLeave={handleVideoEnd} 
        >
          {/* Thumbnail and hover effect */}
          <ImgBox
            src={thumbnail || "/blur.png"}
            alt={title || "logo"}
            className={cn(
              "w-full h-[220px] group-hover:opacity-0 transition-all duration-300",
              imgStyle
            )}
          >
            {!!is_promoted && <PromatedText />}
          </ImgBox>

          {/* Video player section */}
          <div className="h-[220px] absolute inset-0 hidden group-hover:block transition-all duration-300">
            {activeVideo === id && type === "video" && (
              <video
                className="w-full h-full object-cover rounded-md"
                src={video}
                autoPlay
                loop
                muted={false}  // Unmute for active video
                playsInline
              />
            )}
            {activeVideo === id && type === "link" && (
              <div className="w-full h-full object-cover rounded-md overflow-hidden">
                <ReactPlayer
                  className="!w-full !h-full"
                  src={link}
                  playing={true}
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "16px", pointerEvents: 'none' }}
                  controls={false}
                  playsInline={true}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex gap-2 pt-2">
            <Avatars
              className="size-13"
              alt={title}
              src={user?.avatar}
              fallback={user?.channel_name}
            />
            <ul className="[&>li]:text-blacks">
              <li className="text-lg font-semibold line-clamp-2">{title}</li>
              <li>{user?.channel_name}</li>
              <li className="text-grays flex space-x-2 items-center">
                <span className="text-sm">{views_count_formated} views</span>
                <span className="flex items-center text-sm">
                  <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full mr-1"></span>
                  {created_at_format}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}

// link is no show VideoCard2
export function VideoCard2({ item, className }: any) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const {
    id,
    title,
    thumbnail,
    user,
    views_count_formated,
    created_at_format,
    is_promoted,
    is_suspend,
    video,
    type,
    link,
  } = item || {};

  const handleVideoHover = (id: string) => {
    setActiveVideo(id);  
  };

  const handleVideoEnd = () => {
    setActiveVideo(null); 
  };

  return (
    <>
      <div>
      <div
          className="relative group"
          onMouseEnter={() => handleVideoHover(id)}  
          onMouseLeave={handleVideoEnd} 
        >
          {/* Thumbnail and hover effect */}
          <ImgBox
            src={thumbnail || "/blur.png"}
            alt={title || "logo"}
            className={cn("w-full h-[220px] group-hover:opacity-0 transition-all duration-300")}
          >
            {!!is_promoted && <PromatedText />}
          </ImgBox>

          {/* Video player section */}
          <div className="h-[220px] absolute inset-0 hidden group-hover:block transition-all duration-300">
            {activeVideo === id && type === "video" && (
              <video
                className="w-full h-full object-cover rounded-md"
                src={video}
                autoPlay
                loop
                muted={false}  // Unmute for active video
                playsInline
              />
            )}
            {activeVideo === id && type === "link" && (
              <div className="w-full h-full object-cover rounded-md overflow-hidden">
                <ReactPlayer
                  className="!w-full !h-full"
                  src={link}
                  playing={true}
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "16px", pointerEvents: 'none' }}
                  controls={false}
                  playsInline={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div
          className={`flex gap-2 pt-2 ${
            !!is_suspend && "border-reds"
          } border-r border-l border-b rounded-b-md p-2`}
        >
          <Avatars
            className="size-13"
            alt={title}
            src={user?.avatar}
            fallback={user?.channel_name}
          />
          <ul className="[&>li]:text-blacks">
            <li className="text-lg font-semibold line-clamp-2">{title}</li>
            <li>{user?.channel_name}</li>
            <li className="*:text-grays  flex space-x-2 items-center">
              <span className="text-sm">{views_count_formated} views</span>
              <span className="flex items-center text-sm">
                <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full mr-1"></span>
                {created_at_format}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

const PromatedText = () => {
  return (
    <div className="absolute top-2 right-2  bg-reds/80 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1">
      <FavIcon name="rocket" className="size-4 mr-1" />
      <span> Promoted</span>
    </div>
  );
};


// ============== AdminVideoCard ================
export function AdminVideoCard({ item, className, imgStyle }: any) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const {
    id,
    title,
    thumbnail,
    user,
    views_count_formated,
    created_at_format,
    is_promoted,
    video,
    type,
    link,
  } = item || {};

  const handleVideoHover = (id: string) => {
    setActiveVideo(id);  
  };

  const handleVideoEnd = () => {
    setActiveVideo(null); 
  };

  return (
    <div className={className}>
       <div
          className="relative group"
          onMouseEnter={() => handleVideoHover(id)}  
          onMouseLeave={handleVideoEnd} 
        >
          {/* Thumbnail and hover effect */}
          <ImgBox
            src={thumbnail || "/blur.png"}
            alt={title || "logo"}
            className={cn(
              "w-full h-[220px] group-hover:opacity-0 transition-all duration-300",
              imgStyle
            )}
          >
            {!!is_promoted && <PromatedText />}
          </ImgBox>

          {/* Video player section */}
          <div className="h-[220px] absolute inset-0 hidden group-hover:block transition-all duration-300">
            {activeVideo === id && type === "video" && (
              <video
                className="w-full h-full object-cover rounded-md"
                src={video}
                autoPlay
                loop
                muted={false}  // Unmute for active video
                playsInline
              />
            )}
            {activeVideo === id && type === "link" && (
              <div className="w-full h-full object-cover rounded-md overflow-hidden">
                <ReactPlayer
                  className="!w-full !h-full"
                  src={link}
                  playing={true}
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "16px", pointerEvents: 'none' }}
                  controls={false}
                  playsInline={true}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex gap-2 pt-2">
            <Avatars
              className="size-13"
              alt={title}
              src={user?.avatar}
              fallback={user?.channel_name}
            />
            <ul className="[&>li]:text-blacks">
              <li className="text-lg font-semibold line-clamp-2">{title}</li>
              <li>{user?.channel_name}</li>
              <li className="text-grays flex space-x-2 items-center">
                <span className="text-sm">{views_count_formated} views</span>
                <span className="flex items-center text-sm">
                  <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full mr-1"></span>
                  {created_at_format}
                </span>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
}
