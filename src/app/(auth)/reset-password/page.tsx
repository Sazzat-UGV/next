"use client";
import assets from "@/assets";
import Form from "@/components/reuseable/from";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { modifyPayload } from "@/lib";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import React, { Suspense } from "react";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { passwordSchema11 } from "@/schema";
import FavIcon from "@/icon/admin/favIcon";

function ResetPasswordChild() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const from = useForm({
    resolver: zodResolver(passwordSchema11),
    defaultValues: {
      password: "",
      c_password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      ...values,
      email,
    };
    try {
      const data = modifyPayload(value);
      const res = await resetPassword(data).unwrap();
      if (res.status) {
        router.push(`/sign-in`);
        from.reset();
      }
    } catch (err: any) {
      ResponseApiErrors(err.data, from);
    }
  };

  return (
    <div className="fixed inset-0 m-0 md:m-3">
      <Image
        src={assets.auth.forgotImg}
        alt="title"
        fill
        loading="eager"
        className="object-cover z-0 md:rounded-md"
      />
      <div className="relative z-10 max-w-7xl h-full mx-auto flex flex-col  justify-center">
        <Card className="w-full max-w-md rounded-md lg:rounded-none lg:rounded-t-xl px-4 pt-8 pb-15 lg:pb-50 bg-body border-none mx-auto lg:absolute lg:left-1/2 lg:[transform:translateX(-50%)] lg:bottom-0">
          <CardHeader className="flex flex-col items-center space-y-0 gap-0 pt-6">
            <div className="mb-1 flex items-center justify-center w-full">
              <FavIcon className="w-fit h-[50px]" name="logo" />
            </div>
            <CardTitle className="text-2xl font-bold text-reds mt-3">
              Enter new password
            </CardTitle>
            <CardDescription className="text-blacks font-normal text-center mt-1">
              Enter a new password that&lsquo;s secure and memorable. Include a
              mix of letters, numbers and symbols.
            </CardDescription>
          </CardHeader>
          <Form className="space-y-6 pt-8" from={from} onSubmit={handleSubmit}>
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
              name="c_password"
              type="password"
              placeholder="Enter your Confirm Password"
            />

            <Button
              type="submit"
              variant={"primary"}
              className="w-full rounded-full"
              disabled={isLoading}
            >
              Send
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

// ResetPassword
export default function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordChild />
    </Suspense>
  );
}
