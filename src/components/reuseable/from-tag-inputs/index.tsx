"use client"
import React from "react";
import { CircleAlert, X } from "lucide-react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type ControllerRenderProps,
  type ControllerFieldState,
} from "react-hook-form";
import { Badge, Button, Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";

interface formInputProps {
  stylelabel?: string;
  name: string;
  type?: string;
  label?: string;
  eye?: boolean;
  placeholder?: string;
  className?: string;
}

export function FromTagInputs({
  name,
  label,
  stylelabel,
  className,
}: formInputProps) {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    tags: string[],
    onChange: (value: string[]) => void
  ) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newTags = [...tags, inputValue.trim()];
      onChange(newTags);
      setInputValue("");
    }
  };

  const handleRemoveTag = (
    tagToRemove: string,
    tags: string[],
    onChange: (value: string[]) => void
  ) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    onChange(newTags);
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]} 
      render={({
        field,
        fieldState: { error },
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => {
        const tags = field.value || [];

        return (
          <div>
            <div className="relative">
              <div className={cn("relative rounded-3xl border border-input bg-background px-3 py-3",className)}>
                <div className="flex flex-wrap gap-2 pb-2">
                  {tags.map((tag: string,idx:number) => (
                    <Badge
                      key={idx}
                      className="flex items-center border border-input rounded-full bg-transparent mt-2 text-blacks gap-1 px-2 py-1"
                    >
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-2 rounded-full p-2 ml-2 bg-blacks/78 text-white hover:bg-blacks/78 hover:text-white"
                        onClick={() => handleRemoveTag(tag, tags, field.onChange)}
                      >
                        <X className="size-3" />
                        <span className="sr-only">Remove {tag} tag</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
                <Input
                  id="tags-input"
                  type="text"
                  placeholder="Type and hit enter"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) =>
                    handleInputKeyDown(e, tags, field.onChange)
                  }
                  className="h-auto border-none bg-transparent px-0 py-0 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              {label && (
                <Label
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
        );
      }}
    />
  );
}
