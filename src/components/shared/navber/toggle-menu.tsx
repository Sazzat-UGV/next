import FavIcon from "@/icon/admin/favIcon";

function MenuToggle({
  isSide,
  setIsSide,
  show,
}: {
  isSide: boolean;
  setIsSide: (v: boolean) => void;
  show?: boolean;
}) {
  if (!show) return null;
  return (
    <span
      onClick={() => setIsSide(!isSide)}
      className="block md:hidden cursor-pointer"
    >
      <FavIcon name="menu" className="size-6" />
    </span>
  );
}

export default MenuToggle;
