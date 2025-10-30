"use client";
import Navber from "@/components/common/admin/dash/navber";
import Sidebar from "@/components/common/admin/dash/sideber";
import { TitleProvider } from "@/context/title";
import { childrenProps } from "@/types";
import React, { useState } from "react";

export default function AdminLayout({ children }: childrenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <TitleProvider>
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Navber sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="p-4">{children}</div>
        </div>
      </div>
    </TitleProvider>
  );
}
