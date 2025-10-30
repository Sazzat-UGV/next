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
} from "@/components/ui";
import { useSignUpMutation } from "@/redux/api/authApi";
import { SignUpSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { modifyPayload } from "@/lib";
import { useRouter } from "next/navigation";
import FavIcon from "@/icon/admin/favIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Icon from "@/icon";

export default function SignUp() {
  const router = useRouter();
  const [signUp, { isLoading }] = useSignUpMutation();
  const from = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      channel_name: "",
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  // handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    const value = {
      channel_name: values.channel_name,
      name: values.full_name,
      email: values.email,
      password: values.password,
      c_password: values.confirm_password,
    };
    try {
      const data = modifyPayload(value);
      const res = await signUp(data).unwrap();
      if (res.status) {
        router.push(`/varify-otp?email=${values?.email}`);
        from.reset();
      }
    } catch (err: any) {
      ResponseApiErrors(err?.data, from);
    }
  };

  return (
    <div className="fixed inset-0 m-0 md:m-3">
      <Image
        src={assets.auth.signImg}
        alt="title"
        fill
        loading="eager"
        className="object-cover z-0 md:rounded-md"
      />
      <div className="relative z-10 max-w-7xl h-full mx-auto flex flex-col  justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <Card className="w-full max-w-lg rounded-md lg:rounded-none lg:rounded-t-xl px-4 py-8 bg-body border-none mx-auto lg:absolute left-10 2xl:left-0 lg:bottom-0">
              <CardHeader className="flex flex-col items-center space-y-0 gap-0 pt-6">
                <FavIcon className="w-fit h-[50px]" name="logo" />
                <CardTitle className="text-2xl font-bold text-reds mt-3">
                  Create an account
                </CardTitle>
                <CardDescription className="text-blacks text-center">
                  Use your credentials to Sign In
                </CardDescription>
              </CardHeader>
              <Form
                className="space-y-5 pt-4"
                from={from}
                onSubmit={handleSubmit}
              >
                <FromInputs
                  label="Channel name"
                  name="channel_name"
                  placeholder="Enter your Channel"
                />
                <FromInputs
                  label="Your full name"
                  name="full_name"
                  placeholder="Enter your full name"
                />
                <FromInputs
                  label="Email"
                  name="email"
                  placeholder="Enter your Email"
                />
                <FromInputs
                  eye={true}
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your Password"
                />
                <FromInputs
                  eye={true}
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  placeholder="Enter your Confirm Password"
                />

                <Button
                  type="submit"
                  variant={"primary"}
                  className="w-full rounded-full"
                  disabled={isLoading}
                >
                  Sign up
                </Button>
              </Form>
              <div className="text-center text-sm flex justify-center font-medium">
                Already have an account ?{" "}
                <Link
                  href="/sign-in"
                  className="flex items-center justify-center gap-1 ml-1 hover:underline"
                >
                  Sign in <Icon name="arrowRight" />
                </Link>
              </div>
            </Card>
          </div>
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
        </div>
      </div>
    </div>
  );
}
