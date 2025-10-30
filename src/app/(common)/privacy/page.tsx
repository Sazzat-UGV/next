import PrivacyPage from "@/components/view/privacy";
import { Seo } from "@/lib";
import { Metadata } from "next";
import "react-quill-new/dist/quill.snow.css";

export const metadata: Metadata = Seo({
  title: "Privacy Policy | MyTsv",
  description:
    "Welcome to mytsv.com. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using the site",
  keywords: [
    "Privacy Policy",
    "MyTsv Privacy",
    "MyTsv Conditions",
    "MyTsv policy",
    "Privacy Policy MyTsv",
  ],
  url: `/privacy-policy`,
  image: "/images/privacy.png",
});

export default async function Privacy() {
  return <PrivacyPage />;
}
