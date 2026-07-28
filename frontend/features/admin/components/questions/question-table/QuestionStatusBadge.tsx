import { QuestionStatus } from "@/features/admin/types/question";

const STATUS_MAP: Record<
  QuestionStatus,
  { label: string; className: string; dotClassName: string }
> = {
  active: {
    label: "نشط",
    className: "bg-emerald-500/10 text-emerald-500",
    dotClassName: "bg-emerald-500",
  },
  archived: {
    label: "مؤرشف",
    className: "bg-muted text-muted-foreground",
    dotClassName: "bg-muted-foreground",
  },
};

export function QuestionStatusBadge({ status }: { status: QuestionStatus }) {
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
