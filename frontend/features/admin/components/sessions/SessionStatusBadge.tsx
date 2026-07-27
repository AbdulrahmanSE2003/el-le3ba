import { SessionStatus } from "@/features/admin/types/session";

const STATUS_MAP: Record<
  SessionStatus,
  { label: string; className: string; dot: string; pulse?: boolean }
> = {
  in_progress: {
    label: "شغالة الآن",
    className: "bg-sky-500/10 text-sky-500",
    dot: "bg-sky-500",
    pulse: true,
  },
  completed: {
    label: "مكتملة",
    className: "bg-emerald-500/10 text-emerald-500",
    dot: "bg-emerald-500",
  },
  abandoned: {
    label: "منسحب",
    className: "bg-amber-500/10 text-amber-500",
    dot: "bg-amber-500",
  },
  expired: {
    label: "منتهية",
    className: "bg-red-500/10 text-red-500",
    dot: "bg-red-500",
  },
};

export function SessionStatusBadge({ status }: { status: SessionStatus }) {
  const config = STATUS_MAP[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium w-max ${config.className}`}
    >
      <span className="relative flex h-2 w-2">
        {config.pulse && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${config.dot}`}
          />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${config.dot}`}
        />
      </span>
      {config.label}
    </span>
  );
}
