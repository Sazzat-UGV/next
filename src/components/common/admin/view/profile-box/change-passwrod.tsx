"use client";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { Button } from "@/components/ui/button";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { modifyPayload } from "@/lib";
import { useUpdatePasswordMutation } from "@/redux/api/authApi";
import { passwordChangeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ChangePassword() {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const from = useForm({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      c_password: "",
    },
  });

  const handleChange = async (values: any) => {
    try {
      const data = modifyPayload(values);
      const res = await updatePassword(data).unwrap();
      if (res.status) {
        toast.success("Password Changed Successfully", {
          description: "You can now login with new password",
        });
      }
      from.reset();
    } catch (err: any) {
      ResponseApiErrors(err.data, from);
    }
  };
  return (
    <Form className="space-y-4" from={from} onSubmit={handleChange}>
      <FromInput
        className="bg-white border-none rounded-md"
        label="Current Password"
        name="current_password"
        placeholder="********"
        matching={true}
        eye={true}
      />
      <FromInput
        className="bg-white border-none rounded-md"
        label="New Password"
        eye={true}

        name="new_password"
        placeholder="********"
        matching={true}
      />
      <FromInput
        className="bg-white border-none rounded-md"
        label="Confirm Password"
        eye={true}
        name="c_password"
        placeholder="********"
        matching={true}
      />
      <div className="flex justify-center">
        <Button disabled={isLoading} variant={"primary"} className="px-8">
          Save
        </Button>
      </div>
    </Form>
  );
}
