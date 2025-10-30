import { Button, Input } from "@/components/ui";
import Icon from "@/icon";
import { Search } from "lucide-react";
import React, { useState } from "react";
import ToggleButton from "../sideber/toggle-btn";

interface NavItemProps {
  title: string;
  upload?: boolean;
  search?: boolean;
  onClick?: () => void;
  onSearch?: (searchText: string) => void;
  placeholder?: string;
  hidediv?: boolean;
}

export default function NavItem({
  upload = false,
  title,
  onClick,
  search = true,
  onSearch,
  placeholder = "Search across your profile",
  hidediv = false,
}: NavItemProps) {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch?.(text);
  };

  return (
    <div className="flex items-center space-y-2 md:space-y-0 flex-wrap md:flex-nowrap justify-between py-2">
      <h1 className="text-2xl font-bold text-blacks flex items-center gap-x-1">
        <ToggleButton />
        {title}
      </h1>
      {upload && (
        <Button
          onClick={onClick}
          variant="primary"
          size="lg"
          className="rounded-full block md:hidden px-4 md:px-4 w-fit h-11"
        >
          <Icon name="uploadWhite" width={16} height={16} className="md:mr-1" />
          <span className="hidden md:block"> Upload a new video</span>
        </Button>
      )}
       {/* small  device md>all */}
      {search && (
        <div className="relative w-full md:max-w-xs  xl:max-w-xl 2xl:max-w-2xl bg-white rounded-full py-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-grays" />
          <Input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="pl-10 pr-4 py-2 rounded-full border-none w-full placeholder:text-grays"
          />
        </div>
      )}

      {hidediv && <div className="opacity-0"></div>}
       {/* small  big md,lg,xl,2xl*/}
      {upload && (
        <Button
          onClick={onClick}
          variant="primary"
          size="lg"
          className="rounded-full hidden lg:flex px-4 md:px-4 w-fit h-11"
        >
          <Icon name="uploadWhite" width={16} height={16} className="md:mr-1" />
          <span> Upload a new video</span>
        </Button>
      )}
    </div>
  );
}
