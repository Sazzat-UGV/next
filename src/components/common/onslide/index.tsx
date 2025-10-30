"use client";

import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import React, { createContext, useState, useContext } from "react";
import Modal from "@/components/reuseable/modal";
import OnSideAccount from "./account-create";
import PaymentBox from "../payment-box";
import StripePaymentWrapper from "../stripe";
import { reasonType } from "@/lib";
import { useGetPriceQuery } from "@/redux/api/admin/pricingApi";
import { useRouter } from "next/navigation";

// Define a proper context type
type ManageStateType = {
  setIsPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccount: React.Dispatch<React.SetStateAction<boolean>>;
  isPayment: boolean;
  isAccount: boolean;
};

// Create context without undefined
export const ManageState = createContext<ManageStateType | null>(null);

// Custom hook for easier usage
export const useManageState = () => {
  const context = useContext(ManageState);
  if (!context) {
    throw new Error("useManageState must be used within ManageState.Provider");
  }
  return context;
};

export default function OnSideBox() {
  const router = useRouter();
  const [isPayment, setIsPayment] = useState(false);
  const [isAccount, setIsAccount] = useState(false);
  const { data } = useGetPriceQuery({});

  // handlePaymentSuccess
  const handlePaymentSuccess = () => {
    setIsPayment(false);
    router.push("/");
  };

  return (
    <ManageState.Provider
      value={{ setIsPayment, setIsAccount, isPayment, isAccount }}
    >
      <div className="md:w-1/3 flex justify-center md:justify-end">
        <Button
          onClick={() => setIsAccount(true)}
          variant="primary"
          size="lg"
          className="rounded-full gap-3"
        >
          Pay & register now
          <ArrowRight className="h-6 w-6 font-bold -rotate-45" />
        </Button>
      </div>

      <Modal
        open={isAccount}
        setIsOpen={setIsAccount}
        title="Onsite account creation"
        titleStyle="text-center"
        className="sm:max-w-2xl"
      >
        <OnSideAccount />
      </Modal>

      <Modal
        open={isPayment}
        setIsOpen={setIsPayment}
        title="Pay to MyTSV"
        titleStyle="text-center"
      >
        {data?.onsite_account_creation && (
          <StripePaymentWrapper
            amount={data?.onsite_account_creation}
            reason={reasonType.onsite_account}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </Modal>
    </ManageState.Provider>
  );
}
