import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { roleKey } from "./lib";

// Define route constants for better readability and maintainability
const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/varify-otp-password",
  "/onside-account",
];

const userLanding = [
  "/fqa",
  "/about-us",
  "/contact-us",
  "/history",
  "/like-videos",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookiesStore = await cookies();
  const authRole = cookiesStore.get(roleKey)?.value;

  // If no role is assigned, redirect to the login page for any restricted path
  if (!authRole) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Handle route access for authenticated users || pathname.startsWith("/dashboard/");
  if (authRole === "USER") {
    const isUserRoute = userLanding.includes(pathname);
    if (isUserRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Handle route access for admin users
  if (authRole === "ADMIN") {
    if (/^\/admin\/*/.test(pathname)) {
      return NextResponse.next();
    }
    // Admins are allowed to access admin-related paths
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/fqa",
    "/about-us",
    "/contact-us",
    "/history",
    "/like-videos",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/varify-otp-password",
    "/onside-account",
  ],
};
