import { sessionsType } from "@/features/team-profile/types";
import { Flame } from "lucide-react";

interface Props {
  session: sessionsType;
}

export default function CardStats({ session }: Props) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 text-sm shrink-0">
      {/* Result */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">النتيجة</p>
        <p className="font-black text-foreground text-base">
          {session.finalScore}
        </p>
      </div>

      {/* Accuracy */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">الدقة</p>
        <p className="font-bold text-foreground">80%</p>
      </div>

      {/* Streak */}
      <div className="text-center flex flex-col items-center">
        <p className="text-xs text-muted-foreground">ستريك</p>
        <p className="font-bold text-orange-500 flex items-center gap-0.5">
          <Flame className="w-3.5 h-3.5" />
          {session.bestStreak}
        </p>
      </div>
    </div>
  );
}
