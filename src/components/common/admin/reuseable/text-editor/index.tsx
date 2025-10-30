"use client";
import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto min-h-[280px] flex items-center justify-center">
      <Loader className="animate-spin text-reds" />
    </div>
  ),
});

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  className,
}) => {
  const modules = {
    toolbar: [
      [
        { header: [1, 2, 3, false] },
        { size: ["small", false, "large", "huge"] },
      ],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }]
    ],
  };

  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "align",
    "list",
    "indent",
    "blockquote",
    "code-block",
    "link",
  ];



  return (
    <div className="w-full space-y-1">
      <div className="rounded-xl border border-gray-300 bg-gray-50/80 p-2">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className={cn(`min-h-[280px] rounded-b-xl bg-white`, className)}
        />
      </div>
    </div>
  );
};

export default TextEditor;
