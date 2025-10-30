import { Skeleton, TableCell, TableRow } from "@/components/ui";
import { cn } from "@/lib";

interface SkeletonProps {
  colSpan: number;
  length?: number;
  className?: string;
  tdStyle?: string;
}

export function TableSkeleton({
  colSpan,
  length = 10,
  className,
  tdStyle,
}: SkeletonProps) {
  return (
    <TableRow>
      <TableCell className={tdStyle} colSpan={colSpan}>
        <div className="space-y-3">
          {[...Array(length)].map((_, index) => (
            <Skeleton
              key={index}
              className={cn(
                "h-[53px] w-full rounded-md !bg-blacks/20",
                className
              )}
            />
          ))}
        </div>
      </TableCell>
    </TableRow>
  );
}
