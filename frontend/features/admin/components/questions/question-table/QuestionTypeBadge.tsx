import { CircleCheck, ListChecks, PenLine } from "lucide-react";
import { QuestionType } from "@/features/admin/types/question";

const TYPE_MAP: Record<
  QuestionType,
  { label: string; className: string; icon: typeof ListChecks }
> = {
  mcq: {
    label: "اختيار من متعدد",
    className: "bg-primary/10 text-primary",
    icon: ListChecks,
  },
  true_false: {
    label: "صح / خطأ",
    className: "bg-violet-500/10 text-violet-500",
    icon: CircleCheck,
  },
  short_answer: {
    label: "إجابة قصيرة",
    className: "bg-orange-500/10 text-orange-500",
    icon: PenLine,
  },
};

export function QuestionTypeBadge({ type }: { type: QuestionType }) {
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
