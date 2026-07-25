import { sessionsType } from "@/features/team/types";

interface Props {
  session: sessionsType;
}

export default function CardInfo({ session }: Props) {
  const label = session.endReason === "completed" ? "مكتملة" : "غير مكتملة";

  const color =
    session.endReason === "completed" ? "text-green-500" : "text-red-500";

  return (
    <div className="flex items-start gap-3 min-w-0">
      {/* Game Type Icon */}
      <div className={`mt-1 shrink-0`}>
        {/* <session.icon className="w-5 h-5" /> */}
      </div>

      {/* Game Info */}
      <div className="min-w-0">
        <p className="font-bold text-sm text-foreground truncate">
          {session.eventId.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span>{session.completedAt}</span>
          <span>•</span>
          <span className={color}>{label}</span>
        </div>
      </div>
    </div>
  );
}
