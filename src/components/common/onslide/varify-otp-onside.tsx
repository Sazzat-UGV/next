import {
  Button,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@/components/ui";
import { authKey, modifyPayload, roleKey, setCookie } from "@/lib";
import { useOtpVarifyMutation } from "@/redux/api/authApi";
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useManageState } from ".";
import Cookies from "js-cookie";

export default function VarifyOtpOside({ isEmail, setIsEmail }: any) {
  const { isPayment, setIsPayment, setIsAccount, isAccount } = useManageState();
  const [otpVarify, { isLoading }] = useOtpVarifyMutation();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const { value } = e.target;
    // Allow only single digit numbers
    if (!/^\d?$/.test(value)) return;

    const updated = [...code];
    updated[i] = value;
    setCode(updated);

    // Auto-focus next input
    if (value && i < 5) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    // Backspace focuses previous input if current is empty
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (!/^\d{6}$/.test(pastedData)) {
      setError("Please paste a 6-digit number.");
      return;
    }
    setError("");
    setCode(pastedData.split(""));
  };

  const handleVerify = async () => {
    setIsError("");
    try {
      const joinedCode = code.join("");
      if (joinedCode.length < 6) {
        setError("Please enter all 6 digits.");
      } else {
        const value = { email: isEmail, otp: code.join("") };
        const data = modifyPayload(value);
        const res = await otpVarify(data).unwrap();
        if (res.status) {
          const { access_token: token, user: info } = res?.data;
          Cookies.set(roleKey, info.role);
          setCookie(authKey, token);
          setIsEmail("");
          setIsAccount(!isAccount);
          setIsPayment(!isPayment);
        }
        setError("");
      }
    } catch (err: any) {
      if (err?.data?.message) {
        setIsError(err?.data?.message);
      }
    }
  };
  return (
    <div>
      <CardHeader className="flex flex-col items-center space-y-0 gap-0  mb-10">
        <CardTitle className="text-2xl font-semibold text-reds mt-2">
          Verify Code
        </CardTitle>
        <CardDescription className="text-blacks font-normal text-center mt-1">
          Enter the 6 digit code that we sent you to your provided email.
        </CardDescription>
      </CardHeader>
      <div className="w-full md:max-w-sm mx-auto">
        <div className="flex justify-between mb-5">
          {code.map((digit, i) => (
            <Input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              className="w-12 h-12 text-center text-lg font-medium border-gray-300"
            />
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        {isError && (
          <p className="text-red-500 text-sm text-center mb-4">{isError}</p>
        )}
        <Button
          type="button"
          variant="primary"
          className="w-full rounded-full"
          disabled={isLoading}
          onClick={handleVerify}
        >
          Verify
        </Button>
      </div>
    </div>
  );
}
