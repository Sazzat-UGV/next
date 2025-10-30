"use server"
import { cookies } from "next/headers"

export const getCookies = async (keys: string[]) => {
    const cookieStore = await cookies();
    return keys.map((key) => cookieStore.get(key));
}

export const singleCookies = async ({ authKey }: { authKey: string }) =>
  (await cookies()).get(authKey)?.value;