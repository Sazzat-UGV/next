"use client";
import Link from "next/link";
import Icon from "@/icon";
import FavIcon from "@/icon/admin/favIcon";
import AppStore from "../app-store";
import { useGetContactQuery } from "@/redux/api/landing/contactApi";
import { useAuth } from "@/context/auth";

export default function Footer() {
  const { data: contact } = useGetContactQuery({});
  const data = contact?.data;
  const { auth } = useAuth();

  return (
    <footer className="bg-white">
      <div className="container m-auto pt-10 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-2">
            <Link href={"/"}>
              <FavIcon className="w-fit h-[50px]" name="logo" />
            </Link>
            <h3 className="text-xl font-semibold text-blacks">
              Meet your town specialists
            </h3>
            <p className="text-sm text-blacks  leading-relaxed">
              Expanding from the Chicagoland area to a nationwide reach, we aim
              to simplify and enhance the way people find services and
              businesses in their local communities.
            </p>
            <div className="space-y-3 text-sm mt-4">
              <ContactItem icon="femail" text={data?.email || "info@mytsv.com"} />
              <ContactItem icon="fphone" text={data?.phone || "+1 630 297 7501"} />
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blacks">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`${auth?.email ? "/faq" : "/"}`}
                  className="text-blacks"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-blacks ">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blacks">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`${auth?.email ? "/about-us" : "/"}`}
                  className="text-blacks "
                >
                  About us
                </Link>
              </li>
              <li>
                <Link  href={`${auth?.email ? "/contact-us" : "/"}`}  className="text-blacks ">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blacks ">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-blacks ">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blacks">Follow Us</h3>
            <div className="flex items-center space-x-4">
              <Link href="#" aria-label="Facebook">
                <Icon name="ffacebook" width={23} height={23} />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Icon name="fyoutube" width={24} height={24} />
              </Link>
            </div>
            <AppStore />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-5 border-gray-200 text-center text-sm text-blacks">
          <div className="flex items-center justify-center gap-1">
            <Icon name="fcopy" width={18} height={18} />
            <span>{"MyTsv - Meet your town specialists"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// conteact item
function ContactItem({ icon, text }: any) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} width={20} height={20} />
      <div className="text-blacks">{text}</div>
    </div>
  );
}
