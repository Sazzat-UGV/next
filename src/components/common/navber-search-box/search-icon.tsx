import { Search } from "lucide-react";
import React, { useState } from "react";

export default function SearchIcon() {
    const [isShow,setIsShow]=useState(false)
  return (
    <div>
      <h1 className="size-12 bg-reds/80 rounded-full cursor-pointer grid place-items-center">
        <Search className="text-white size-5" />
      </h1>
    </div>
  );
}
