"use client";
import { Button } from "@/components/ui";
import Img from "@/components/reuseable/img";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import FavIcon from "@/icon/admin/favIcon";
import SidebarFixed from "@/components/common/sideber/sideber-fixed";
import NavberSearchBox from "@/components/common/navber-search-box";
import { useAuth } from "@/context/auth";
import { useState } from "react";

export default function Navber() {
  const [isSide, setIsSide] = useState(false);
  const path = usePathname();
  const patterns = [/^\/video\/.+/, /^\/profile$/];
  const isMenu = patterns.some((regex) => regex.test(path));
  const { auth } = useAuth();

  const renderItem = () => {
    if (auth?.email) {
      return (
        <Link href="/dashboard">
          <Button
            variant="primary"
            className="h-12 px-1 md:pl-2 md:pr-4 rounded-full"
          >
            <Img src={auth?.avatar} className="size-10" title="img" />
            <span className="hidden md:block">{auth?.name}</span>
          </Button>
        </Link>
      );
    }

    return (
      <Link href="/sign-in">
        <Button
          variant="primary"
          className="h-12 has-[>svg]:px-1 md:!px-4 rounded-full"
        >
          <FavIcon
            name="unUser"
            color="#ffffff"
            className="size-10 md:hidden"
          />
          <span className="hidden md:block">Sign in to your Account</span>
        </Button>
      </Link>
    );
  };

  return (
    <div className="py-4">
      <div className="w-11/12 mx-auto">
        <ul className="relative  flex items-center  justify-between">
          <li className="flex space-x-5 items-center">
            <span
              className="block md:hidden"
              onClick={() => setIsSide(!isSide)}
            >
              <FavIcon
                name="menu"
                className={`size-6 cursor-pointer ${
                  isMenu ? "block" : "block md:hidden"
                }`}
              />
            </span>

            <Link href={"/"}>
              <FavIcon className="w-fit h-[50px]" name="logo" />
            </Link>
          </li>
          <li>
            <NavberSearchBox />
          </li>
          <li>{renderItem()}</li>
        </ul>
        {/* navber fixed */}
        <SidebarFixed isSide={isSide} setIsSide={setIsSide} />
      </div>
    </div>
  );
}
