import { Poppins } from "next/font/google"; // Import Poppins
import "@/app/style/globals.css";
import Providers from "@/components/providers";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "react-quill-new/dist/quill.snow.css";

// Load Poppins font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add desired weights
  display: "swap",
});

export async function generateMetadata() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-seo`, {
    cache: "force-cache",
    next: { revalidate: 72 * 60 * 60 },
  });
  const { data } = await res.json();
  return {
    title: data?.title,
    description: data?.description,
    keywords: data?.tags.join(", "),
    openGraph: {
      title: data?.title,
      description: data?.description,
      images: data?.links.map((link: any) => link.value).flat(),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
