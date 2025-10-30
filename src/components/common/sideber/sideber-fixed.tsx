"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui";
import { cn } from "@/lib/utils";
import { usePathname} from "next/navigation";
import Img from "@/components/reuseable/img";
import { useHandleLogout } from "@/lib/logout";
import Modal from "@/components/reuseable/modal";
import TabList from "../upload/tab";
import { useAuth } from "@/context/auth";
import Icon from "@/icon";

type SidebarFixedProps = {
  isSide: boolean;
  setIsSide: (val: boolean) => void;
};

export default function SidebarFixed({ isSide, setIsSide }: SidebarFixedProps) {
  const [isUpload, setIsUpload] = useState(false);
  const logout = useHandleLogout();
  const pathname = usePathname();
  const { auth, navItem } = useAuth();
  const isUser = !!auth?.email;

  // ✅ Prevent background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSide ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSide]);

  return (
    <div>
      {/* Overlay */}
      <div
        role="presentation"
        className={`fixed inset-0  bg-black/50 z-20 transition-opacity duration-300 ${
          isSide ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSide(false)}
      />

      {/* Sidebar */}
      <aside
        role="dialog"
        className={`fixed top-0 h-screen overflow-y-scroll scrollbar-hide left-0 w-64  bg-white z-30 shadow-lg transform transition-transform duration-300 ${
          isSide ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="">
          <div className={`flex items-center  p-4 h-20 justify-start`}>
            <button
              onClick={() => setIsSide(!isSide)}
              className="p-2 rounded-md cursor-pointer"
            >
              <Icon name="menu" width={25} height={25} />
            </button>
            <h1 className="ml-4 text-2xl font-semibold text-blacks">Menu</h1>
          </div>
          {/* sign in /sign out */}
          {isUser && (
            <Link
              href="/dashboard"
              className="flex items-center gap-3 py-1 border mx-3  my-3  px-1  rounded-full transition-colors justify-start"
            >
              <Img
                className="size-9 rounded-full"
                src={auth?.avatar || "/blur.png"}
                title="User avatar"
              ></Img>
              <span className="font-medium text-gray-800 whitespace-nowrap">
                {auth?.name}
              </span>
            </Link>
          )}

          <nav className="flex-1 py-2 mx-2 space-y-3">
            {navItem.map((item: any, index: any) =>
              item.text === "separator" ? (
                <Separator key={`separator-${index}`} />
              ) : (
                <Link
                  key={item.text}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-blacks hover:bg-gray-100 rounded-full transition-colors justify-start",
                    item.href === pathname && "bg-gray-100 font-semibold"
                  )}
                  onClick={(e) => {
                    if (item.href === "/upload") {
                      e.preventDefault();
                      setIsUpload(true);
                    }
                  }}
                >
                  {item.icon}
                  <span className="whitespace-nowrap font-normal">
                    {item.text}
                  </span>
                </Link>
              )
            )}
            {isUser && (
              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors text-red-500 justify-start`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSide(false);
                  logout();
                }}
              >
                <Icon name="ssignout" />{" "}
                <span className="whitespace-nowrap font-normal">Sign out</span>
              </div>
            )}
          </nav>
        </div>
      </aside>

      {/* Upload Modal ======== */}
      <Modal
        open={isUpload}
        setIsOpen={setIsUpload}
        title="Upload a new video"
        titleStyle="text-center"
        className="sm:max-w-4xl"
      >
        <TabList setIsUpload={setIsUpload} />
      </Modal>
    </div>
  );
}
