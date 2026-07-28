import { NotificationStatus } from "@/features/admin/types/notification";

const STATUS_MAP: Record<
  NotificationStatus,
  { label: string; className: string; dotClassName: string }
> = {
  sent: {
    label: "اترسل",
    className: "bg-emerald-500/10 text-emerald-500",
    dotClassName: "bg-emerald-500",
  },
  scheduled: {
    label: "مجدول",
    className: "bg-sky-500/10 text-sky-500",
    dotClassName: "bg-sky-500",
  },
  failed: {
    label: "فشل",
    className: "bg-red-500/10 text-red-500",
    dotClassName: "bg-red-500",
  },
};

export function NotificationStatusBadge({
  status,
}: {
  status: NotificationStatus;
}) {
  const config = STATUS_MAP[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium w-max ${config.className}`}
    >
      <span className={`h-2 w-2 rounded-full ${config.dotClassName}`} />
      {config.label}
    </span>
  );
}
