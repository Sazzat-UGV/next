"use client";

import { useState, ReactNode } from "react";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FromInputProps {
  name: string;
  type?: string;
  eye?: boolean;
  label?: string;
  placeholder?: string;
  stylelabel?: string;
  className?: string;
  icon?: ReactNode;
  
}

export function FromField({
  name,
  type = "text",
  eye = false,
  label,
  placeholder,
  stylelabel,
  className,
  icon,
}: FromInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { control } = useFormContext();

  const inputType = eye ? (isPasswordVisible ? "text" : "password") : type;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label && (
            <Label className={cn("mb-2 text-black text-base", stylelabel)}>
              {label}
            </Label>
          )}

          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {icon}
              </div>
            )}

            <Input
              className={cn(icon ? "pl-10" : "", eye ? "pr-10" : "", className)}
              {...field}
              type={inputType}
              placeholder={placeholder}
            />

            {eye && (
              <div
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              >
                {isPasswordVisible ? (
                  <EyeOff className="text-muted-foreground" size={20} />
                ) : (
                  <Eye className="text-muted-foreground" size={20} />
                )}
              </div>
            )}
          </div>

          {error?.message && (
            <div className="text-sm pt-[1px] text-end text-[#f73f4e] flex gap-1 items-center justify-end">
              {error.message}
              <CircleAlert size={14} />
            </div>
          )}
        </div>
      )}
    />
  );
}
