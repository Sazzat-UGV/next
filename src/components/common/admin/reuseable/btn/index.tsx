import FavIcon from "@/icon/admin/favIcon";
import { cn } from "@/lib/utils";

type BtnProps = {
  onClick?: () => void;
  className?:string
};

// Previewbtn
export function Previewbtn({ onClick }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className="size-[37px] bg-[#FFF3EB] grid place-items-center  rounded-lg cursor-pointer"
    >
      <FavIcon name="eye" />
    </button>
  );
}

// Deletebtn
export function Deletebtn({ onClick,className }: BtnProps) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={cn(`size-[37px] grid place-items-center text-[#FF5353] bg-[#FFE8E8] rounded-lg cursor-pointer`,className)}
    >
      <FavIcon name="delete" />
    </button>
  );
}


// Editbtn
export function Editbtn({ onClick,className }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className={cn(`size-[37px] bg-[#DBFFDB] grid place-items-center  rounded-lg cursor-pointer`,className)}
    >
      <FavIcon name="edit" />
    </button>
  );
}