import ContactUs from "@/components/common/contact-us";
import SectionNav from "@/components/reuseable/section-nav";
import ContactPreview from "@/components/view/contact-us";
import { Seo } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = Seo({
  title: "Contact Us | MyTsv",
  description:
    "Reach out to MyTsv for support, business inquiries, or partnership opportunities. We're here to help you connect with our team.",
  keywords: [
    "MyTsv Terms",
    "MyTsv Conditions",
    "MyTsv policy",
    "MyTsv legal",
    "terms and conditions MyTsv",
  ],
  url: `/contact-us`,
  image: "/images/contact-us.svg",
});

export default function Contact() {
  return (
    <div className="m-auto max-w-7xl">
      <SectionNav
        src={"/images/contact-us.svg"}
        title="Contact Us"
        imgStyle="h-48 w-60 sm:w-xs"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContactPreview />
        <ContactUs />
      </div>
    </div>
  );
}
