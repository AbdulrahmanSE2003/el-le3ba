import { Megaphone, UsersRound } from "lucide-react";

const TYPE_MAP: Record<
  string,
  { label: string; className: string; icon: typeof Megaphone }
> = {
  broadcast: {
    label: "برودكاست",
    className: "bg-primary/10 text-primary",
    icon: Megaphone,
  },
  selected: {
    label: "أشخاص محددين",
    className: "bg-violet-500/10 text-violet-500",
    icon: UsersRound,
  },
};

const FALLBACK = {
  label: "غير معروف",
  className: "bg-muted text-muted-foreground",
  icon: Megaphone,
};

export function NotificationTypeBadge({ type }: { type: string }) {
  const config = TYPE_MAP[type] || FALLBACK;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium w-max ${config.className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}
