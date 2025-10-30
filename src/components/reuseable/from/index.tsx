"use client"
import { cn } from "@/lib/utils";
import React from "react";
import {
    type FieldValues,
    FormProvider,
    type SubmitHandler
} from "react-hook-form";





type fromProps = {
    className?: string;
    children: React.ReactNode;
    onSubmit: (data: FieldValues) => void;
    from: any
};

function Form({ children, className, onSubmit, from }: fromProps) {
    const submit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
        // form.reset(); 
    };

    return (
        <FormProvider {...from}>
            <form noValidate onSubmit={from.handleSubmit(submit)}>
                <div className={cn("w-full", className)}>{children}</div>
            </form>
        </FormProvider>
    );
}

export default Form;