import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  color: string;
  onClick: () => void;
}

export default function ActionBtn({
  icon: Icon,
  title,
  color,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted text-right transition`}
    >
      <Icon className={`w-4 h-4 ${color}`} />
      {title}
    </button>
  );
}
