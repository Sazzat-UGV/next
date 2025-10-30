import { removeCookie } from "./utils";
import { authKey, roleKey } from "./constants";
import {useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

export function useHandleLogout() {
  const { setAuth } = useAuth();
  const router = useRouter();
  // const [getProfile] = useLazyGetProfileQuery();

  const logout = () => {
    removeCookie(authKey);
    removeCookie(roleKey);
    setAuth({});
    router.push("/");
  };
  return logout;
}
