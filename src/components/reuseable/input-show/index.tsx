import { Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";

interface formInputProps {
    label: string;
    stylelabel?: string;
    className?: string;
    value: string;
}

export function FromShow({
    label,
    stylelabel,
    className,
    value
}: formInputProps) {
    return (
        <div className="relative">
            <Input
                className={cn(
                    "h-12 w-full rounded-full pl-4 pr-3 text-blacks/80 !text-base",
                    className
                )}
                type="text"
                value={value}
                readOnly
            />
            <Label
                className={cn(
                    "text-blacks text-base font-medium absolute -top-3 left-7 bg-body px-3",
                    stylelabel
                )}
            >
                {label}
            </Label>
        </div>
    );
}
