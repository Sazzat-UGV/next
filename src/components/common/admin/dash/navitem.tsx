"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import FavIcon from "@/icon/admin/favIcon";

interface SubmenuItem {
  to?: string;
  label: string;
  icon?: any;
}

interface MenuItem {
  to?: string;
  label: string;
  icon?: any;
  submenu?: SubmenuItem[];
}

interface NavItemProps {
  item: MenuItem[];
}

export default function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [subhoverIdx, setsubHoverIdx] = useState<number | null>(null);

  const menuRefs = useRef<(HTMLUListElement | null)[]>([]);

  useEffect(() => {
    menuRefs.current.forEach((menu, index) => {
      if (menu) {
        menu.style.maxHeight =
          activeSubmenu === index ? `${menu.scrollHeight}px` : "0px";
      }
    });
  }, [activeSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setActiveSubmenu((prev) => (prev === index ? null : index));
  };

  return (
    <ul className="space-y-2 mr-5">
      {item.map(({ to, label, icon, submenu }, parentIndex) => (
        <li key={parentIndex} className="group">
          {to ? (
            <Link
              onMouseEnter={() => setHoverIdx(parentIndex)}
              onMouseLeave={() => setHoverIdx(null)}
              className={`flex px-3 ${
                pathname === to &&
                "!border-l-5 !border-[#073CE9] !bg-white !text-reds "
              } hover:bg-white   rounded-r-md hover:!text-reds   border-l-5 border-transparent  py-2 items-center font-medium text-base gap-x-2 text-white`}
              href={to}
            >
              {/* hoverColor="#000000" activeColor={ pathname === to && "#000000" as string}  */}
              {icon && (
                <FavIcon
                  hoverColor="#ef4444"
                  groupHover={hoverIdx === parentIndex}
                  activeColor={pathname === to && ("#ef4444" as any)}
                  name={icon}
                />
              )}{" "}
              {label}
            </Link>
          ) : (
            <div
              onClick={() => handleSubmenuToggle(parentIndex)}
              className="flex items-center px-3 py-2 justify-between cursor-pointer"
            >
              <span className="flex items-center gap-x-2 font-medium">
                {icon && <FavIcon name={icon} />} {label}
              </span>
              {activeSubmenu === parentIndex ? (
                <ChevronUp className="size-5 font-extrabold" />
              ) : (
                <ChevronDown className="size-5 font-extrabold" />
              )}
            </div>
          )}

          {submenu && (
            <ul
              ref={(el) => {
                menuRefs.current[parentIndex] = el;
              }}
              className="overflow-hidden transition-all duration-300 ease-out max-h-0 space-y-1"
            >
              {submenu.map(({ to, label, icon }, subIndex) => (
                <li
                  key={subIndex}
                  onMouseEnter={() => setsubHoverIdx(subIndex)}
                  onMouseLeave={() => setsubHoverIdx(null)}
                  className={`${
                    pathname === to &&
                    "!border-l-5 !border-[#073CE9] !bg-white !text-reds"
                  } rounded-r-md pl-6 hover:bg-white font-medium border-l-5 border-transparent  py-2 hover:!text-reds`}
                >
                  {to && (
                    <Link className="flex items-center gap-x-2" href={to}>
                      {icon && (
                        <FavIcon
                          hoverColor="#ef4444"
                          groupHover={subhoverIdx === subIndex}
                          activeColor={pathname === to && ("#ef4444" as any)}
                          name={icon}
                        />
                      )}{" "}
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
