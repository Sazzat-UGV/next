"use client";
import { useState } from "react";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type ControllerRenderProps,
  type ControllerFieldState,
} from "react-hook-form";
import { Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";

interface formInputProps {
  stylelabel?: string;
  name: string;
  type?: string;
  label?: string;
  eye?: boolean;
  placeholder?: string;
  className?: string;
  matching?: boolean;
  [key: string]: any
}

export function FromInput({
  name,
  type = "text",
  eye = false,
  label,
  placeholder,
  stylelabel,
  matching = false,
  className,
  ...rest
}: formInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { control } = useFormContext();
  const inputType = eye ? (isPasswordVisible ? "text" : "password") : type;

  const inputId = `input-${name}`;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field,
        fieldState: { error },
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => (
        <div>
          {matching && (
            <Label
              htmlFor={inputId}
              className={cn(
                "text-blacks text-base font-medium  px-3 mb-1",
                stylelabel
              )}
            >
              {label}
            </Label>
          )}
          <div className="relative">
            <Input
              id={inputId}
              className={cn(
                `h-12 w-full rounded-full  pl-4 pr-3  text-blacks ${
                  !matching && "placeholder:text-blacks"
                } text-sm`,
                className
              )}
              {...field}
              {...rest}
              type={inputType}
              placeholder={matching ? placeholder : label}
            />
            {eye && (
              <div
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute cursor-pointer  top-1/2 [transform:translateY(-50%)] right-3"
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
            <h3 className="text-sm pt-[1px] text-end text-[#f73f4e] flex gap-1 items-center justify-end">
              {error.message}
              <CircleAlert size={14} />
            </h3>
          )}
        </div>
      )}
    />
  );
}
