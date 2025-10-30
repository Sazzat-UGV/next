"use client";
import assets from "@/assets";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { Button, Card, CardHeader, CardTitle } from "@/components/ui";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { delay, modifyPayload } from "@/lib";
import { useSignUpMutation } from "@/redux/api/authApi";
import { onSideSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import VarifyOtpOside from "./varify-otp-onside";
import { toast } from "sonner";
import FavIcon from "@/icon/admin/favIcon";

export default function OnSideAccount() {
  const [isEmail, setIsEmail] = useState("");
  const [isVarify, setIsVarify] = useState(true);
  const [signUp, { isLoading }] = useSignUpMutation();
  const from = useForm({
    resolver: zodResolver(onSideSchema),
    defaultValues: {
      channel_name: "",
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      representative_secret_key: "",
    },
  });

  // handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    setIsEmail(values.email);
    const value = {
      representative_secret_key: values?.representative_secret_key,
      channel_name: values.channel_name,
      name: values.full_name,
      email: values.email,
      password: values.password,
      c_password: values.confirm_password,
      registration_type: "on_site",
    };
    try {
      const data = modifyPayload(value);
      const res = await signUp(data).unwrap();
      if (res.status) {
        toast.success("Create Account Successful", {
          description: res?.message,
        });
        await delay(4050);
        setIsVarify(false);
        from.reset();
      } else {
        toast.error("Account Creation Failed", {
          description:
            "The representative secret key you entered is invalid. Please check and try again.",
        });
      }
    } catch (err: any) {
      if (err?.data) {
        ResponseApiErrors(err?.data, from);
      }
    }
  };

  //   ============otp functionlity start==============

  return (
    <div>
      <Card className="border-none p-0 gap-0 py-6">
        <div className="flex justify-center">
           <FavIcon className="w-fit h-[50px]" name="logo" />
        </div>
        {isVarify ? (
          <>
            <CardHeader className="flex flex-col items-center space-y-0 gap-0  pb-4">
              <CardTitle className="text-2xl font-semibold text-reds mt-2">
                Create an account
              </CardTitle>
            </CardHeader>
            <Form
              className="space-y-6 pt-4"
              from={from}
              onSubmit={handleSubmit}
            >
              <FromInputs
                label="Representative secret key"
                name="representative_secret_key"
                stylelabel="bg-white"
                placeholder="Representative secret key hare"
              />
              <FromInputs
                label="Email"
                name="email"
                stylelabel="bg-white"
                placeholder="Enter your Email"
              />
              <FromInputs
                label="Channel name"
                name="channel_name"
                stylelabel="bg-white"
                placeholder="Channel name goes here"
              />
              <FromInputs
                label="Your full name"
                name="full_name"
                stylelabel="bg-white"
                placeholder="Your full name hare"
              />
              <FromInputs
                stylelabel="bg-white"
                eye={true}
                label="Password"
                name="password"
                placeholder="Enter your Password"
              />
              <FromInputs
                stylelabel="bg-white"
                eye={true}
                label="Confirm Password"
                name="confirm_password"
                placeholder="Enter your Confirm Password"
              />

              <Button
                type="submit"
                variant={"primary"}
                className="w-full rounded-full"
                disabled={isLoading}
              >
                Create account
              </Button>
            </Form>
            {/* <Button
              variant="outline"
              size={"lg"}
              className="w-full mt-5 rounded-full border flex justify-between shadow-none px-1"
            >
              <div className="flex items-center">
                <Icon name="google" className="mr-1" />
                <span>Continue with Google</span>
              </div>
              <ArrowRight className="size-4 text-blacks rotate-[-20deg]" />
            </Button> */}
          </>
        ) : (
          <VarifyOtpOside setIsEmail={setIsEmail} isEmail={isEmail} />
        )}
      </Card>
    </div>
  );
}
