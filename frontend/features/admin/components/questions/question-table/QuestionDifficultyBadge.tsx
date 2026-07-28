import { QuestionDifficulty } from "@/features/admin/types/question";

const DIFFICULTY_MAP: Record<
  QuestionDifficulty,
  { label: string; className: string }
> = {
  easy: {
    label: "سهل",
    className: "bg-emerald-500/10 text-emerald-500",
  },
  medium: {
    label: "متوسط",
    className: "bg-amber-500/10 text-amber-500",
  },
  hard: {
    label: "صعب",
    className: "bg-red-500/10 text-red-500",
  },
};

export function QuestionDifficultyBadge({
  difficulty,
}: {
  difficulty: QuestionDifficulty;
}) {
  const config = DIFFICULTY_MAP[difficulty];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium w-max ${config.className}`}
    >
      {config.label}
    </span>
  );
}
