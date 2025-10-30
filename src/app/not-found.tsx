import React from "react";
import img404 from "@/assets/404.png";
import { ImgBox } from "@/components/common/admin/reuseable";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div>
        <ImgBox src={img404} alt="404" />
        <Link href="/">
          <Button
            className="rounded-full w-full mt-6"
            size="lg"
            variant="primary"
          >
            <ArrowLeft className="text-white" /> Go back
          </Button>
        </Link>
      </div>
    </div>
  );
}
