import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy, Flame, CheckCircle2, Clock } from "lucide-react";

import { AdminSession } from "@/features/admin/types/session";
import { SessionStatusBadge } from "./SessionStatusBadge";
import { formatDate } from "@/components/shared/formatted-date";

function formatDuration(seconds: number | null) {
  if (seconds === null) return "لسه شغالة";
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes} د ${remaining} ث`;
}

interface Props {
  session: AdminSession | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SessionDetailsDialog({ session, open, onOpenChange }: Props) {
  if (!session) return null;

  const stats = [
    {
      label: "النتيجة النهائية",
      value: session.finalScore,
      icon: Trophy,
      className: "text-accent",
    },
    {
      label: "الإجابات الصحيحة",
      value: `${session.correctAnswers} / ${session.totalQuestions}`,
      icon: CheckCircle2,
      className: "text-emerald-500",
    },
    {
      label: "أفضل تتابع (Streak)",
      value: session.bestStreak,
      icon: Flame,
      className: "text-orange-500",
    },
    {
      label: "مدة المباراة",
      value: formatDuration(session.durationSeconds),
      icon: Clock,
      className: "text-primary",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3 pl-6">
            <DialogTitle>تفاصيل المباراة</DialogTitle>
            <SessionStatusBadge status={session.status} />
          </div>
          <DialogDescription>
            {session.teamId?.teamName ?? "فريق محذوف"} · {session.eventId?.title}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-muted/30 p-3"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <stat.icon className={`w-3.5 h-3.5 ${stat.className}`} />
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <p className="text-lg font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 text-xs text-muted-foreground border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span>كود الفريق</span>
            <span className="text-foreground font-medium">
              {session.teamId?.teamCode ?? "-"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>وقت البداية</span>
            <span className="text-foreground font-medium">
              {formatDate(session.startedAt)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>وقت الانتهاء</span>
            <span className="text-foreground font-medium">
              {session.completedAt ? formatDate(session.completedAt) : "-"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
