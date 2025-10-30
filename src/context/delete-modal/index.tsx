"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Icon from "@/icon";
import FavIcon from "@/icon/admin/favIcon";
import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState, ReactNode } from "react";

// ✅ Default State
const initialDialogState: ConfirmDialogState = {
  open: false,
  title: "Are you sure to delete this video ?",
  description: "Users can't find your video anymore.",
  confirmText: "Yes, Delete",
  cancelText: "Cancel",
  className: "",
  titleStyle: "",
  btnStyle: "",
  icon: "i1",
  onConfirm: undefined,
  onCancel: undefined,
  resolve: undefined,
};

// ✅ Types
type ConfirmDialogOptions = Partial<Omit<ConfirmDialogState, "open" | "resolve">>;

interface ConfirmDialogState {
  open: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  className?: string;
  titleStyle?: string;
  btnStyle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  resolve?: (value: boolean) => void;
  icon?: "i1" | "i2" | "i3";
}

interface ConfirmDialogContextType {
  confirm: (options?: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

interface ConfirmDialogProviderProps {
  children: ReactNode;
}

export const ConfirmDialogProvider = ({ children }: ConfirmDialogProviderProps) => {
  const [dialogState, setDialogState] = useState<ConfirmDialogState>(initialDialogState);

  // ✅ Main confirm function
  const confirm = (options: ConfirmDialogOptions = {}): Promise<boolean> => {
    return new Promise((resolve) => {
      setDialogState({
        ...initialDialogState, // Reset first
        ...options, // Apply custom options
        open: true,
        resolve,
      });
    });
  };

  // ✅ Confirm & Cancel Handlers
  const handleConfirm = () => {
    dialogState.resolve?.(true);
    dialogState.onConfirm?.();
    closeDialog();
  };

  const handleCancel = () => {
    dialogState.resolve?.(false);
    dialogState.onCancel?.();
    closeDialog();
  };

  // ✅ Reset everything after closing
  const closeDialog = () => {
    setDialogState(initialDialogState);
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <AlertDialog open={dialogState.open} onOpenChange={closeDialog}>
        <AlertDialogContent className={cn("rounded-md w-[420px] px-6 py-6", dialogState?.className)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <ul>
                {/* Icon */}
                <li className="flex justify-center mb-2">
                  {dialogState.icon === "i1" && <FavIcon name="delete" className="size-12 text-red-500" />}
                  {dialogState.icon === "i2" && <Icon name="alertRed" width={50} height={50} />}
                  {dialogState.icon === "i3" && <FavIcon name="check" className="size-12 text-green-500" />}
                </li>

                {/* Title */}
                <li className={cn("text-center text-reds text-2xl", dialogState.titleStyle)}>
                  {dialogState.title}
                </li>
              </ul>
            </AlertDialogTitle>

            {/* Description */}
            <AlertDialogDescription className="text-center text-gray2">
              {dialogState.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Footer Buttons */}
          <AlertDialogFooter className="sm:justify-center mt-3">
            <AlertDialogCancel
              onClick={handleCancel}
              className={cn(
                "cursor-pointer rounded-full py-6 px-8",
                dialogState?.btnStyle
              )}
            >
              {dialogState.cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={cn(
                "bg-reds hover:bg-reds cursor-pointer rounded-full py-6 px-5",
                dialogState?.btnStyle
              )}
            >
              {dialogState.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  );
};

// ✅ Hook
export default function useConfirmation(): ConfirmDialogContextType {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error("useConfirmation must be used within a ConfirmDialogProvider");
  }
  return context;
}

