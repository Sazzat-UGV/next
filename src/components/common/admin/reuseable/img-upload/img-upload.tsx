"use client";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDragAndDrop } from ".";
import FavIcon from "@/icon/admin/favIcon";
import { cn } from "@/lib/utils";
import { ImgBox } from "../Img-box";

type uploaderProps = {
  title: string;
  className?: string;
  fileSelect: (file: File) => void;
};

export default function ImageUploader({
  title,
  className,
  fileSelect,
}: uploaderProps) {
  const { dragActive, preview, handleDrag, handleDrop, handleBrowse } =
    useDragAndDrop({
      onFileSelect: (file) => fileSelect(file),
    });

  return (
    <div
      className={cn(
        `border-2 border-dashed rounded-lg h-[200px] w-full p-1 flex flex-col items-center justify-center text-center transition-colors  ${
          dragActive ? "border-red-400 bg-red-50" : "border-gray-300"
        }`,
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {preview ? (
        <ImgBox src={preview} alt="img" className="w-full h-full">
          <div
            onClick={() => document.getElementById("file-input")?.click()}
            className="size-8 absolute cursor-pointer grid place-items-center rounded-md  top-2 right-2 backdrop-blur-3xl bg-black/50"
          >
            <FavIcon className="size-4" name="editprofile" />
          </div>
        </ImgBox>
      ) : (
        <div>
          <div className="flex justify-center mb-2">
            <FavIcon name="representative" />
          </div>

          <p className="text-blaks  mb-2">
            {preview ? "Change the image" : title}
          </p>
          <p className="text-gray-400 font-medium mb-4">Or</p>

          <Button
            variant="primary"
            type="button"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            Browse files
          </Button>
        </div>
      )}

      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBrowse}
      />
    </div>
  );
}
