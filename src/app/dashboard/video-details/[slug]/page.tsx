import VideoDetailsBox from "@/components/common/dashboard/video-tab";
import { SlugParams } from "@/types";
import { Suspense } from "react";


export default async function VideoDetails({ params }: SlugParams) {
   const { slug } = await params;
  return (
    <Suspense fallback={<h1 className="opacity-0">Loading</h1>}>
         <VideoDetailsBox slug={slug || ""} />
    </Suspense>

  );
}

