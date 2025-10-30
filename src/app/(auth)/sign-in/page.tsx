import SignIn from "@/components/view/login";
import { Seo } from "@/lib";
import React from "react";

export const metadata = Seo({
  title: "Sign In to Your Account",
  description:
    "Sign in to upload your creative content and share it with friends, family, and the world on MyTSC.",
  keywords: [
    "mytsv",
    "mytsv account",
    "MyTSV sign up",
    "onside account",
    "MyTSV account setup",
    "mytsc sign-up",
    "youtube",
    "videos"
  ],
  url: "/sign-in",
  image: "/images/onsideImg.jpg",
});

export default function Login() {
  return <SignIn />;
}
