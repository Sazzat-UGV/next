"use client";

import React, { useEffect, useState } from "react";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import { Button, Input, Skeleton } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import {
  useGetContactQuery,
  useUpdateContactMutation,
} from "@/redux/api/landing/contactApi";
import { modifyPayload } from "@/lib";
import { toast } from "sonner";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";

const initContact = {
  email: "",
  phone: "",
  address: "",
};

export default function Contacts() {
  const { data, isLoading: contactLoading } = useGetContactQuery({});
  const [updateContact, { isLoading }] = useUpdateContactMutation();
  const [contacts, setContacts] = useState(initContact);

  useEffect(() => {
    if (data?.data) {
      setContacts({
        email: data?.data?.email,
        phone: data?.data?.phone,
        address: data?.data?.address,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContacts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = modifyPayload(contacts);
    const res = await updateContact(data).unwrap();
    if (res.status) {
      toast.success("Updated Successfull", {
        description: "Contact details have been updated",
      });
    }
  };

  return (
    <div>
      <NavTitle
        title="Contacts"
        subTitle="You can manage the contacts section of MyTSV from here"
      />
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto space-y-8 py-10"
      >
        {contactLoading ? (
          <SkeletonCount count={3}>
            <div className="flex items-center gap-x-2">
              <Skeleton className="size-11 2xl:size-12 rounded-full" />
              <Skeleton className="h-11 rounded-full w-full" />
            </div>
          </SkeletonCount>
        ) : (
          <>
            <ul className="flex gap-2">
              <li className="bg-white rounded-full grid place-items-center h-[46px] w-12">
                <FavIcon name="mail" className="size-5" />
              </li>
              <li className="w-full">
                <Input
                  placeholder="Type Here"
                  name="email"
                  value={contacts.email}
                  onChange={handleChange}
                  className="rounded-full h-11"
                />
              </li>
            </ul>

            <ul className="flex gap-2">
              <li className="bg-white rounded-full grid place-items-center h-[46px] w-12">
                <FavIcon name="phone" className="size-5" />
              </li>
              <li className="w-full">
                <Input
                  placeholder="Type Here"
                  name="phone"
                  value={contacts.phone}
                  onChange={handleChange}
                  className="rounded-full h-11"
                />
              </li>
            </ul>

            <ul className="flex gap-2">
              <li className="bg-white rounded-full grid place-items-center h-[46px] w-12">
                <FavIcon name="location" className="size-5" />
              </li>
              <li className="w-full">
                <Input
                  placeholder="Type Here"
                  name="location"
                  value={contacts.address}
                  onChange={handleChange}
                  className="rounded-full h-11"
                />
              </li>
            </ul>

            <Button
              type="submit"
              variant="primary"
              className="rounded-full float-right"
              size="lg"
              disabled={isLoading}
            >
              Save changes
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
