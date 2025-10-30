"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";

// Props interface
interface FromTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  stylelabel?: string;
  matching?: boolean;
}

export function FromTextAreas({
  name,
  label,
  placeholder,
  className,
  stylelabel,
  matching = false,
  ...rest
}: FromTextAreaProps) {
  const { control } = useFormContext();
  const fieldId = `textarea-${name}`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="relative">
            <Textarea
              id={fieldId}
              className={cn(
                "w-full rounded-3xl  pl-3 pr-3 py-3  text-blacks resize-none   text-sm",
                className
              )}
              placeholder={placeholder}
              {...field}
              {...rest}
            />
            {!matching && (
              <Label
                htmlFor={fieldId}
                className={cn(
                  "text-blacks text-base font-medium absolute -top-3 left-7 bg-body px-3",
                  stylelabel
                )}
              >
                {label}
              </Label>
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
