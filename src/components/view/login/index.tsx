"use client";
import assets from "@/assets";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Label,
} from "@/components/ui";
import auth from "@/firebase.config";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { authKey, modifyPayload, roleKey, setCookie } from "@/lib";
import { useSignInMutation, useSocialLoginMutation } from "@/redux/api/authApi";
import { loginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import Cookies from "js-cookie";
import FavIcon from "@/icon/admin/favIcon";
import Icon from "@/icon";
import { useAuth } from "@/context/auth";

export default function SignIn() {
  const { setAuth } = useAuth();
  const [signIn, { isLoading }] = useSignInMutation();
  const [socialLogin, { isLoading: isLoadingSocial }] =
    useSocialLoginMutation();
  const [isError, setIsError] = useState("");
  const router = useRouter();
  const from = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    setIsError("");
    const value = {
      email: values.email,
      password: values.password,
    };
    try {
      const data = modifyPayload(value);
      const res = await signIn(data).unwrap();
      if (res.status) {
        const { access_token: token, user: info } = res.data;
        Cookies.set(roleKey, info.role);
        setCookie(authKey, token);
        setAuth({
          name: info?.name,
          email: info?.email,
          avatar: info?.avatar,
          id: info?.id,
          role: info?.role,
        });
        if (info.role == "USER") {
          router.push("/");
        } else if (info.role == "ADMIN") {
          router.push("/admin");
        }
      }

      from.reset();
    } catch (err: any) {
      if (err?.data?.errors) {
        ResponseApiErrors(err.data, from);
      } else if (!err?.data?.status && err?.data?.message) {
        setIsError(err.data.message);
      }
    }
  };

  // handleGoogle ss  ff 55
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Prepare the data
      const formData = new FormData();
      formData.append("name", user.displayName || "");
      formData.append("email", user.email || "");
      formData.append("google_id", user.uid);

      // Check if there's a photo and add it
      if (user.photoURL) {
        const response = await fetch(user.photoURL);
        const blob = await response.blob();
        formData.append("photo", blob, `profile_${Date.now()}.jpeg`);
      }

      // Handle the login response
      const res = await socialLogin(formData).unwrap();
      if (res.status) {
        const { access_token: token, user: info } = res.data;
        setCookie(authKey, token);
        Cookies.set(roleKey, info.role);
        if (info.role == "USER") {
          router.push("/");
        }
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="fixed inset-0 m-0 md:m-3">
      <Image
        src={assets.auth.loginImg}
        alt="title"
        fill
        loading="eager"
        className="object-cover z-0 md:rounded-md"
      />
      <div className="relative z-10 max-w-7xl h-full mx-auto flex flex-col  justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="text-center hidden lg:block text-white self-center">
            <h1 className="text-3xl font-bold">MyTSV</h1>
            <h1 className="font-medium text-xl">
              Connect with your town like never before
            </h1>
            <ul className="space-y-2 mt-4 pl-50">
              {[
                "Access your personalized feed",
                "Interact with local experts",
                "Stay updated with your town",
              ].map((item, index) => (
                <li className="flex gap-1" key={index}>
                  <Icon name="checkWhite" width={20} height={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Card className="w-full clip-path-[polygon(0_0,100%_0,100%_90%,50%_100%,0_90%)] max-w-md rounded-md lg:rounded-none lg:rounded-t-xl px-4 py-8 bg-body border-none mx-auto lg:absolute right-10 2xl:right-0 md:bottom-0">
              <CardHeader className="flex flex-col items-center space-y-0 gap-0 pt-6">
                <FavIcon className="w-fit h-[50px]" name="logo" />
                <CardTitle className="text-2xl font-bold text-reds mt-3">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-blacks text-center">
                  Use your credentials to login
                </CardDescription>
              </CardHeader>
              <Form
                className="space-y-6 pt-4"
                from={from}
                onSubmit={handleSubmit}
              >
                <FromInputs
                  label="Email"
                  name="email"
                  placeholder="Enter your Email"
                />
                <FromInputs
                  eye={true}
                  label="Password"
                  name="password"
                  placeholder="Enter your Password"
                />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me">Remember me</Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-reds font-semibold hover:underline"
                  >
                    Forgot Password ?
                  </Link>
                </div>
                {isError && (
                  <h1 className="text-reds text-sm text-center">{isError}</h1>
                )}
                <Button
                  type="submit"
                  variant={"primary"}
                  className="w-full rounded-full"
                  disabled={isLoading}
                >
                  Sign in
                </Button>
              </Form>
              <div className="text-center text-sm flex justify-center font-medium">
                Don&apos;t have an account ?{" "}
                <Link
                  href="/sign-up"
                  className="flex items-center justify-center gap-1 ml-1 hover:underline"
                >
                  Sign Up <Icon name="arrowRight" />
                </Link>
              </div>
              <Button
                variant="outline"
                size={"lg"}
                className="w-full rounded-full border flex justify-between shadow-none px-1"
                onClick={() => handleGoogle()}
                disabled={isLoadingSocial}
              >
                <div className="flex items-center">
                  <Icon name="google" className="mr-1" />
                  <span>Continue with Google</span>
                </div>
                <ArrowRight className="size-4 text-blacks rotate-[-20deg]" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
