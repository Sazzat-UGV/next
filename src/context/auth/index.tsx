"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import { authKey } from "@/lib";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { navItems, signOutItems } from "@/components/common/sideber/nav-data";

type AuthContextType = {
  auth: any;
  navItem: any;
  setAuth: (value: any) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<any>({});
  const token = Cookies.get(authKey);

  const { data: profile, isLoading } = useGetProfileQuery(
    {},
    { refetchOnFocus: true, skip: !token }
  );
  // ======== set user info ========
  useMemo(() => {
    if (profile && !isLoading) {
      setAuth({
        name: profile?.data?.name,
        email: profile?.data?.email,
        avatar: profile?.data?.avatar,
        id: profile?.data?.id,
        role: profile?.data?.role,
      });
    }
  }, [profile, isLoading]);

  // ======== role-based route ========
  const getNavItem = useMemo(() => {
    if (auth?.role === "USER") {
      return navItems;
    }
    return signOutItems;
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isLoading, navItem: getNavItem }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
