"use client";
import Sidebar from "@/components/common/dashboard/sideber";
import { childrenProps } from "@/types";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function UserDashboardLayout({ children }: childrenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className="flex h-screen overflow-hidden">
        {/* side ber */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* main content all  */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

// useSidebarUser
export const useSidebarUser = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
