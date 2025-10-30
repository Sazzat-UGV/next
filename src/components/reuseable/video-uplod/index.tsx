"use client";

import React, { useRef, ChangeEvent, ReactNode } from "react";

interface VideoUploaderProps {
  onFileSelect: (file: File) => void;
  children: ReactNode;
  className?: string;
}

const VideoUpload: React.FC<VideoUploaderProps> = ({
  onFileSelect,
  children,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={className}
      style={{ cursor: "pointer" }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="video/*"
      />
      {children}
    </div>
  );
};

export default VideoUpload;