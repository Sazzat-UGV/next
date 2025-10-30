"use client";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Icon from "@/icon";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface SuccessDialogState {
    open: boolean;
    title?: string;
    description?: string;
    resolve?: (value: boolean) => void;
}

interface SuccessDialogContextType {
    success: (title?: string, description?: string) => Promise<boolean>;
}

const SuccessDialogContext = createContext<SuccessDialogContextType | undefined>(undefined);

export const SuccessDialogProvider = ({ children }: { children: ReactNode }) => {
    const [dialogState, setDialogState] = useState<SuccessDialogState>({
        open: false,
        title: "Payment successful",
        description: "Redirecting to home page",
    });

    const success = (title?: string, description?: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setDialogState({
                open: true,
                title: title || "Payment successful",
                description: description || "Redirecting to home page",
                resolve,
            });

            // ✅ Auto close after 1 minute (60000 ms)
            setTimeout(() => {
                closeDialog();
            }, 3000);
        });
    };

    const closeDialog = () => {
        if (dialogState.resolve) dialogState.resolve(true);
        setDialogState((prev) => ({ ...prev, open: false }));
    };

    return (
        <SuccessDialogContext.Provider value={{ success }}>
            {children}
            <AlertDialog open={dialogState.open} onOpenChange={closeDialog}>
                <AlertDialogContent className="rounded-md w-[420px] px-8 py-10 text-center">
                    <AlertDialogHeader className="text-center mx-auto">
                        <AlertDialogTitle>
                            <div className="flex justify-center mb-3">
                                <Icon name="sucessGreen" width={70} height={70} />
                            </div>
                            <div className="text-green-600 text-2xl font-semibold">
                                {dialogState.title}
                            </div>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500 mt-2 text-center">
                            {dialogState.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {/* ✅ Removed the OK button */}
                    <AlertDialogFooter className="hidden" />
                </AlertDialogContent>
            </AlertDialog>
        </SuccessDialogContext.Provider>
    );
};

// Hook
export function useSuccessDialog(): SuccessDialogContextType {
    const context = useContext(SuccessDialogContext);
    if (!context) {
        throw new Error("useSuccessDialog must be used within SuccessDialogProvider");
    }
    return context;
}
