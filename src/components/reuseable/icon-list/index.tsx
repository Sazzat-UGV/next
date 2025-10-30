"use client"
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface BackBtnProps {
  onClick?: () => void;
  className?: string;
  iconStyle?: string;
}

export const BackBtn = ({ onClick, className, iconStyle }: BackBtnProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex items-center cursor-pointer gap-x-2 text-blacks font-medium text-base bg-transparent border-none outline-none",
      className
    )}
    aria-label={"Back"}
  >
    <span
      className={cn(
        "bg-white rounded-full size-10 grid place-items-center",
        iconStyle
      )}
    >
      <ArrowLeft size={20} />
    </span>
    <span>{"Back"}</span>
  </button>
);

// Back buttons
export const Back = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="size-10 bg-white rounded-full grid place-items-center cursor-pointer"
      aria-label="Back"
      onClick={() => router.back()}
    >
      <ArrowLeft size={20} />
    </button>
  );
};
