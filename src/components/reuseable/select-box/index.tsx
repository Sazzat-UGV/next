import React, { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { cn } from '@/lib/utils';

interface SelectBoxItem {
  label: string;
  value: string;
  icon?:any;
}

interface SelectBoxProps {
  onChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  itemStyle?: string;
  items: SelectBoxItem[];
}

export default function SelectBox({
  onChange,
  defaultValue,
  placeholder,
  className,
  itemStyle,
  items
}: SelectBoxProps) {
    const [isValue, setIsValue] = useState(defaultValue);

  const handleValueChange = (value: string) => {
    if (value === isValue) return; 
    setIsValue(value);
    onChange?.(value); 
  };
  return (
    <Select onValueChange={handleValueChange } value={isValue}>
      <SelectTrigger className={cn("w-full rounded-full py-[22px] cursor-pointer shadow-none", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-md p-0">
        <SelectGroup className="p-0 m-0">
          {items?.map((item, index) => (
            <SelectItem
              className={cn("border-b last:border-b-0 py-3 pl-4 rounded-none", itemStyle)}
              key={index}
              value={item.value}
            >
              {item.icon && item.icon} {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
