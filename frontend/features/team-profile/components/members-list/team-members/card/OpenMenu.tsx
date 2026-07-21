import { MoreVertical } from "lucide-react";

interface Props {
  setOpenMenu: (openMenu: string | null) => void;
  openMenu: string | null;
  memberId: string;
}

export default function OpenMenu({ setOpenMenu, openMenu, memberId }: Props) {
  return (
    <button
      onClick={() => setOpenMenu(openMenu === memberId ? null : memberId)}
      className="p-1.5 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground"
    >
      <MoreVertical className="w-4 h-4" />
    </button>
  );
}
