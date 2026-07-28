import { Award, Megaphone, ShieldAlert, Timer } from "lucide-react";
import { NotificationType } from "@/features/admin/types/notification";

const TYPE_MAP: Record<
  NotificationType,
  { label: string; className: string; icon: typeof Megaphone }
> = {
  announcement: {
    label: "تنبيه عام",
    className: "bg-primary/10 text-primary",
    icon: Megaphone,
  },
  match_reminder: {
    label: "تذكير بمباراة",
    className: "bg-sky-500/10 text-sky-500",
    icon: Timer,
  },
  warning: {
    label: "تحذير / حظر",
    className: "bg-red-500/10 text-red-500",
    icon: ShieldAlert,
  },
  achievement: {
    label: "إنجاز",
    className: "bg-amber-500/10 text-amber-500",
    icon: Award,
  },
};

export function NotificationTypeBadge({ type }: { type: NotificationType }) {
  const config = TYPE_MAP[type];
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
