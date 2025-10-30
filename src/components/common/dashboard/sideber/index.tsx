"use client";
import Link from "next/link";
import Icon from "@/icon";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SideberFixed from "../../sideber/sideber-fixed";
import FavIcon from "@/icon/admin/favIcon";
import { Button } from "@/components/ui";
import { useHandleLogout } from "@/lib/logout";

// main side ber component
export default function Sidebar({ sidebarOpen, setSidebarOpen }: any) {
  const pathname = usePathname();
  const [isSide, setIsSide] = useState(false);
  const logout = useHandleLogout();
  const navItems = [
    { icon: <Icon name="sdashboard" />, text: "Dashboard", href: "/dashboard" },
    {
      icon: <Icon name="svideos" />,
      text: "My videos",
      href: "/dashboard/my-videos",
    },
    {
      icon: <Icon name="sanalytics" />,
      text: "Analytics",
      href: "/dashboard/analytics",
    },
    {
      icon: <Icon name="ssetting" />,
      text: "Settings",
      href: "/dashboard/settings",
    },
    {
      icon: <Icon name="sreport" />,
      text: "Reports",
      href: "/dashboard/reports",
    },
  ];

  return (
    <div className="">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`absolute left-0 top-0 w-64 z-20 bg-white flex h-screen  transition-transform transform duration-300 ease-linear flex-col overflow-y-hidden  text-white  lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col ">
          <div>
            <div className="flex items-center justify-center my-4 text-white">
              <Icon
                onClick={() => setIsSide(!isSide)}
                name="menu"
                width={25}
                height={25}
                className="cursor-pointer"
              />
              <Link href={"/"} className="ml-4">
                <FavIcon className="w-fit h-[50px]" name="logo" />
              </Link>
            </div>
            <nav className="flex-1 py-2 mx-2 space-y-3">
              {navItems.map((item: any, index) => (
                <Link
                  key={item.text}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-blacks hover:bg-gray-100 justify-start rounded-lg transition-colors",
                    item.href === pathname && "bg-gray-100 font-semibold"
                  )}
                >
                  {item.icon}
                  <span className="whitespace-nowrap font-normal">
                    {item.text}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="w-full absolute bottom-10  flex justify-center">
            <Button
              onClick={logout}
              variant="primary"
              className="border-reds/20 text-reds hover:text-reds bg-[#FFE9E9]"
            >
              <Icon name="ssignout" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
      {/* fixed side ber */}
      <SideberFixed isSide={isSide} setIsSide={setIsSide} />
    </div>
  );
}
