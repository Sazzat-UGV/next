import BlogsPage from "@/components/view/blog";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs | All Blogs",
  description:
    "Discover insightful articles on health, wellness, and expert medical advice. Stay up-to-date with our latest blog posts, tips, and professional guidance to support your well-being.",
};

export default function Blogs() {
  return (
    <>
      <BlogsPage />
    </>
  );
}
