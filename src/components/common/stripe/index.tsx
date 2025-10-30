import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui";
import {
  useStorePaymentMutation,
  useSuccessPaymentMutation,
} from "@/redux/api/stripeApi";
import { toast } from "sonner";
import { delay, modifyPayload } from "@/lib";
import { useGetProfileQuery } from "@/redux/api/authApi";

// Custom Hook for managing the payment process
export const usePayment = (amount: number, reason: string) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const { data: profile } = useGetProfileQuery({});
  const { id } = profile?.data || {};

  const stripe = useStripe();
  const elements = useElements();

  const [storePayment] = useStorePaymentMutation();
  const [successPayment] = useSuccessPaymentMutation();

  useEffect(() => {
    const initializePayment = async () => {
      const value = {
        amount,
        payment_method: "pm_card_visa", // Default payment method
        reason,
      };

      try {
        const data = modifyPayload(value);
        const res = await storePayment(data).unwrap();
        setPaymentInfo({
          reason: reason,
          amount: res?.data?.amount,
          payment_intent_id: res?.data?.id,
          user_id: id,
        });
      } catch (error) {
        // console.error("Payment initialization failed:", error);
      }
    };

    initializePayment();
  }, [storePayment, amount, reason, id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || loading) {
      return;
    }

    // Trigger Stripe form submission
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    // Finalize the payment
    setLoading(true);
    try {
      const res = await successPayment(modifyPayload(paymentInfo)).unwrap();
      if (res.status) {
        toast.success("Payment Successful!", {
          description: "Your payment has been processed successfully.",
        });
        await delay();
        setIsPaymentSuccessful(true);
      }
    } catch (error) {
      setErrorMessage("Payment processing failed.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errorMessage,
    isPaymentSuccessful,
    handleSubmit,
  };
};

interface StripeBoxProps {
  amount: number;
  reason: string;
  onSuccess: () => void; // Callback to handle success
}

// StripeBox Component
const StripeBox: React.FC<StripeBoxProps> = ({ amount, reason, onSuccess }) => {
  const { loading, errorMessage, isPaymentSuccessful, handleSubmit } =
    usePayment(amount, reason);

  useEffect(() => {
    if (isPaymentSuccessful) {
      onSuccess(); // Trigger on success callback when payment is successful
    }
  }, [isPaymentSuccessful, onSuccess]);

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: "tabs" }} />
      <Button
        variant={"primary"}
        className="mt-5 float-end"
        type="submit"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay"}
      </Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

// StripePaymentWrapper Component
const StripePaymentWrapper: React.FC<StripeBoxProps> = ({
  amount,
  reason,
  onSuccess,
}) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_CLIENT_KEY as string
  );

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: amount * 100, // Convert amount to cents for Stripe
        currency: "usd", // Set currency to USD
      }}
    >
      <StripeBox amount={amount} reason={reason} onSuccess={onSuccess} />
    </Elements>
  );
};

export default StripePaymentWrapper;
