import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  title: string;
  titleStyle?: string;
  mainStyle?: string;
}

export default function Modal({
  open,
  setIsOpen,
  children,
  className,
  title,
  titleStyle,
  mainStyle,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild />
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className={cn(
          "sm:max-w-md p-0 gap-0 bg-white rounded-2xl overflow-y-auto  max-h-[95vh] h-fit scrollbar-hide border-none",
          className
        )}
      >
        <DialogHeader className="bg-red-500 text-white p-4">
          <DialogTitle className={cn("text-white font-medium", titleStyle)}>
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        <div className={cn("p-4", mainStyle)}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
