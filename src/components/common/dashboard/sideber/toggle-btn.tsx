import React from "react";
import Icon from "@/icon";
import { cn } from "@/lib";
import { useSidebarUser } from "../userlayout";




export default function ToggleButton({ className }: { className?: string }) {
  const { sidebarOpen, setSidebarOpen } = useSidebarUser();
  return (
    <div className={cn(`block lg:hidden`, className)}>
      <Icon
        onClick={() => setSidebarOpen(!sidebarOpen)}
        name="menu"
        width={25}
        height={25}
        className="cursor-pointer size-6"
      />
    </div>
  );
}
