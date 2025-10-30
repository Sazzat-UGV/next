import Footer from "@/components/shared/footer";
import Navber from "@/components/shared/navber";
import { childrenProps } from "@/types";

export default function SimpleLayout({ children }: childrenProps) {
  return (
    <>
      <Navber  />
      {children}
      <Footer />
    </>
  );
}
