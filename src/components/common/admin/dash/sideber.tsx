"use client";
import React from "react";
import NavItem from "./navitem";
import { adminLinks } from "./navdata";
import { Button } from "@/components/ui";
import { authKey, removeCookie, roleKey } from "@/lib";
import { redirect } from "next/navigation";
import FavIcon from "@/icon/admin/favIcon";
import { useAuth } from "@/context/auth";
import Icon from "@/icon";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const { setAuth } = useAuth();
  const links = adminLinks;

  const handleSignOut = () => {
    removeCookie(authKey);
    removeCookie(roleKey);
    setAuth({});
    redirect("/");
  };

  return (
    <div className="flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`absolute left-0 top-0 z-20 bg-reds flex h-screen  transition-transform transform duration-300 ease-linear flex-col overflow-y-hidden  text-white w-[240px] lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-screen relative">
          <div className="flex items-center justify-center bg-white m-2 rounded-md py-1">
            <FavIcon className="w-fit h-[50px]" name="logo" />
          </div>
          <div className="h-[calc(100vh-80px)] flex flex-col justify-between overflow-y-scroll scrollbar-hide">
            <nav>
              <NavItem item={links} />
            </nav>
            <div className="w-full my-3 flex justify-center">
              <Button
                onClick={() => handleSignOut()}
                variant="primary"
                className="text-red-500 bg-white rounded-sm"
              >
                <Icon name="ssignout" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
