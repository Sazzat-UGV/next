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
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import FavIcon from "@/icon/admin/favIcon";
import { delay, modifyPayload } from "@/lib";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { ForgotSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type forgotProps = z.infer<typeof ForgotSchema>;

function ForgotPasswordChild() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const from = useForm<forgotProps>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      email: values.email,
    };
    try {
      const data = modifyPayload(value);
      const res = await forgotPassword(data).unwrap();
      if (res.status) {
        toast.success("Code sent to your email", {
          description: "Check your email to get the code",
        });
      }
      router.push(`/varify-otp-password?email=${values.email}`);
      from.reset();
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
            <div className="mb-1 flex items-center justify-between w-full">
              <Link href={"/sign-in"}>
                <h1 className="bg-white size-8 rounded-full grid place-items-center relative -left-4 cursor-pointer">
                  <ArrowLeft size={20} />
                </h1>
              </Link>
              <FavIcon className="w-fit h-[50px]" name="logo" />
              <h1 className="opacity-0">0</h1>
            </div>
            <CardTitle className="text-2xl font-bold text-reds mt-3">
              Forgot Password ?
            </CardTitle>
            <CardDescription className="text-blacks font-normal text-center mt-1">
              Enter your email address that you provided during sign up. We will
              send you a 6 digit code through that email.
            </CardDescription>
          </CardHeader>
          <Form className="space-y-6 pt-8" from={from} onSubmit={handleSubmit}>
            <FromInputs
              label="Email"
              name="email"
              placeholder="Enter your Email"
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

export default function ForgotPassword() {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <ForgotPasswordChild />
    </Suspense>
  );
}
