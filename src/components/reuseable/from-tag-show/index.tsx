"use client";
import React from "react";
import { Badge, Label } from "@/components/ui";
import { cn } from "@/lib/utils";

interface FromTagShowProps {
  name: string;
  tags?: string[];
  label?: string;
  className?: string;
  stylelabel?: string;
}

export function FromTagShow({
  name,
  tags = [],
  label,
  className,
  stylelabel,
}: FromTagShowProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="rounded-3xl border border-input bg-background px-3 py-3">
        <div className="flex flex-wrap gap-2 pb-2">
          {tags.length > 0 ? (
            tags.map((tag, idx) => (
              <Badge
                key={idx}
                className="mt-2 flex items-center gap-1 rounded-full border border-input bg-transparent px-3 py-1 text-blacks"
              >
                {tag}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No tags available</p>
          )}
        </div>
      </div>

      {label && (
        <Label
          htmlFor={name}
          className={cn(
            "absolute -top-3 left-7 bg-body px-3 text-base font-medium text-blacks",
            stylelabel
          )}
        >
          {label}
        </Label>
      )}
    </div>
  );
}
