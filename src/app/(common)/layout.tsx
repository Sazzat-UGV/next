"use client";
import Footer from "@/components/shared/footer";
import Navber from "@/components/shared/navber";
import { childrenProps } from "@/types";
import { useSidebar } from "@/context/useSideber";
import Sidebar from "@/components/common/sideber/sideber";


export default function CommonLayout({ children }: childrenProps) {
  const { isExpanded } = useSidebar();


  return (
    <div className="flex flex-col min-h-screen">
      <Navber />
      <div className="flex flex-1">
        {/* Sidebar must be inside a tall parent */}
        <div
          className={`hidden md:block transition-all duration-300 ease-in-out ${
            isExpanded ? "w-sideber-md" : "w-sideber-xs"
          } shrink-0`}
        >
          <div className="!sticky !top-0 !left-0">
            <Sidebar />
          </div>
        </div>

        {/* ✅ Use the memoized MainContent component */}
        <main className="flex-1 p-4 lg:px-6 lg:py-4 overflow-y-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
