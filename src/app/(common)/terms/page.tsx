import TermsPage from "@/components/view/terms-page";
import { Seo } from "@/lib";
import { Metadata } from "next";
import "react-quill-new/dist/quill.snow.css";

export const metadata: Metadata = Seo({
  title: "Terms & Conditions | MyTsv",
  description:
    "Welcome to mytsv.com. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using the site",
  keywords: [
    "Terms & Conditions",
    "MyTsv Terms",
    "MyTsv Conditions",
    "MyTsv policy",
    "terms and conditions MyTsv",
  ],
  url: `/terms`,
  image: "/images/tarams.svg",
});

export default async function Terms() {
  return <TermsPage />;
}
