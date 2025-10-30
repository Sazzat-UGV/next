"use client";

import React, { useRef, ChangeEvent, ReactNode } from "react";

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  children: ReactNode;
  className?: string;
}

const ImgUpload: React.FC<ImageUploaderProps> = ({
  onFileSelect,
  children,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // This function is triggered when a file is selected
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  // This function programmatically clicks the hidden file input
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div onClick={handleClick} className={className} style={{ cursor: "pointer" }}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*" // Restrict to image files
      />
      {/* The visible trigger element (e.g., an icon or button) */}
      {children}
    </div>
  );
};

export default ImgUpload;