"use client";
import { UserDashboardLayout } from "@/components/common/dashboard/userlayout";
import { redirect, usePathname } from "next/navigation";
import { childrenProps } from "@/types";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { roleKey } from "@/lib";

export default function UserLayout({ children }: childrenProps) {
  const pathname = usePathname();
  const roleValue = Cookies.get(roleKey);
  const isUser = roleValue === "USER";

  useEffect(() => {
    if (!isUser && /^\/dashboard\/*/.test(pathname)) {
      return redirect("/");
    }
  }, [isUser,pathname]);
  return <UserDashboardLayout>{children}</UserDashboardLayout>;
}
