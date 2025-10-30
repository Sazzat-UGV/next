import { Menu } from "lucide-react";
import Link from "next/link";
import { useTitle } from "@/context/title";
import FavIcon from "@/icon/admin/favIcon";
import { ImgBox } from "../reuseable";
import { useAuth } from "@/context/auth";
import { Skeleton } from "@/components/ui";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Navber({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const { title, subtitle } = useTitle();
  const { auth } = useAuth();

  return (
    <div className="sticky top-0  flex w-full bg-[white] py-3 z-10 shadow-xs">
      <header className="w-full px-3">
        <div className="flex justify-between items-center">
          {/* left side*/}
          <div className="flex gap-4 items-center">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              className="z-99999 block  border rounded-md border-stroke cursor-pointer  p-1.5 lg:hidden"
            >
              <Menu className="cursor-pointer" size={20} />
            </button>
            <ul className="hidden lg:block">
              <li className="text-2xl font-bold text-black1">{title}</li>
              {subtitle && (
                <li className="text-black1 font-normal">{subtitle}</li>
              )}
            </ul>
          </div>
          {/* right side */}
          <div>
            <div className="flex mr-6 items-center gap-2">
              <Link href={"/admin/notification"}>
                <div className="relative cursor-pointer bg-reds text-green-900 size-11 2xl:size-12  grid place-items-center rounded-full">
                  <FavIcon name="bell" />
                </div>
              </Link>

              {auth?.email && (
                <Link href={"/admin/profile"}>
                  <div className="relative flex items-center gap-2 rounded-full cursor-pointer">
                    <ImgBox
                      src={auth?.avatar || "/blur.png"}
                      className="rounded-full size-11 2xl:size-12"
                      alt="User Icon"
                    />
                    <span className="text-blacks text-xl font-medium">
                      {auth?.name || ""}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
