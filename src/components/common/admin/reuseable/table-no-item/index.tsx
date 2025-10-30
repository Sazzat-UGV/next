import React from "react";
import { TableCell, TableRow } from "@/components/ui";
import { cn } from "@/lib/utils";
import FavIcon from "@/icon/admin/favIcon";

interface itemProps {
  title?: string;
  colSpan: number;
  className?: string;
  tdStyle?:string
}

export function TableNoItem({
  title = "No Data Found",
  colSpan,
  className,
  tdStyle
}: itemProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className={cn("text-center",tdStyle)}>
        <div className={cn("py-24 2xl:py-40 text-center", className)}>
          <div className="flex justify-center">
            <FavIcon color="#99a1af" name="svgFile" />
          </div>
          <h3 className="text-sm font-medium text-gray-400 mt-5">{title}</h3>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function NoItemData({ title = "No Data Found", className }: any) {
  return (
    <div className={cn("py-24 2xl:py-40 text-center flex flex-col justify-center", className)}>
      <div className="flex justify-center">
        <FavIcon color="#99a1af" name="svgFile" />
      </div>
      <h3 className="text-sm font-medium text-gray-400 mt-5">{title}</h3>
    </div>
  );
}
