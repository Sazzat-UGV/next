import { cn } from "@/lib/utils";
import React from "react";

interface SmallCicleProps {
  className?: string;
}

export function SmallCicle({ className }: SmallCicleProps) {
  return (
    <span
      className={cn(
        `inline-block w-2 h-2 bg-[#D9D9D9] rounded-full mr-1`,
        className
      )}
    ></span>
  );
}
