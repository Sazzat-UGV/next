import {
  Table as TableArea,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import React, { ReactNode } from "react";

interface TableProps {
  className?: string;
  headers?: string[];
  children: ReactNode;
}

export const CustomTable = ({
  className,
  headers = [],
  children,
}: TableProps) => {
  return (
    <div className={className}>
      <div>
        <TableArea className=" border-separate border-spacing-y-5 my-0">
          {headers && headers.length > 0 && (
            <TableHeader className="translate-y-3">
              <TableRow className="text-base  font-semibold text-center  text-blacks border-2 border-[#F6F6F6]">
                {headers?.map((header, index) => (
                  <TableHead key={index}>
                    <h1 className="w-max capitalize font-semibold">{header}</h1>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody className=" [&>tr>td]:bg-white [&>tr>td]:first:pl-5 [&>tr>td]:first:rounded-l-lg [&>tr>td]:last:rounded-r-lg [&>tr>td]:last:w-[180px]  space-y-5 [&>tr]:border-[#F6F6F6]">
            {children}
          </TableBody>
        </TableArea>
      </div>
    </div>
  );
};
