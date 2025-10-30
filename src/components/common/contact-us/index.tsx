"use client";
import { Button, Card } from "@/components/ui";
import { contactSchema } from "@/schema";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { useStoreContactMutation } from "@/redux/api/landing/contactApi";
import { modifyPayload } from "@/lib";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import Icon from "@/icon";
import { toast } from "sonner";

export default function ContactUs() {
  const [storeContact, { isLoading }] = useStoreContactMutation();
  const from = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    try {
      const data = modifyPayload(values);
      const res = await storeContact(data).unwrap();
      if (res.status) {
        toast.success("Message Sent Successfully!", {
          description: "Thank you for reaching out",
        });
      }
      from.reset();
    } catch (err: any) {
      if (err?.data?.errors) {
        ResponseApiErrors(err.data, from);
      }
    }
  };
  return (
    <Card>
      <Form className="space-y-7 md:space-y-8" from={from} onSubmit={handleSubmit}>
        <FromInputs label="Name" name="name" placeholder="Enter your Name" />
        <FromInputs label="Email" name="email" placeholder="Enter your Email" />
        <FromInputs
          label="Subject"
          name="subject"
          placeholder="Enter your Subject"
        />

        <FromTextAreas
          className="resize-none h-24 rounded-2xl"
          label="Your message"
          name="message"
          placeholder="Your message"
        />

        <Button
          type="submit"
          size={"lg"}
          variant={"primary"}
          className="rounded-full text-base font-normal w-full"
          disabled={isLoading}
        >
          Send message{" "}
          <Icon name="sent" className="relative top-[1px]" width={18} />
        </Button>
      </Form>
    </Card>
  );
}
