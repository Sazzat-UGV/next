"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";

// Props interface
interface FromTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  stylelabel?: string;
}

export function FromTextArea({
  name,
  label,
  placeholder,
  className,
  stylelabel,
  ...rest
}: FromTextAreaProps) {
  const { control } = useFormContext();

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
            <Textarea
              className={cn("h-12 w-full rounded-full  pl-4 pr-3  text-blacks placeholder:text-blacks text-sm",className)}
              placeholder={label}
              {...field}
              {...rest}
            />
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
