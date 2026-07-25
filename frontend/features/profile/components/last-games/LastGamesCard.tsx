import { fadeInDown } from "@/components/shared/animations";
import Motion from "@/components/shared/Motion";
import { LastSession } from "@/features/profile/types";

interface LastGamesCardProps {
  session: LastSession;
}

export default function LastGamesCard({ session }: LastGamesCardProps) {
  return (
    <Motion
      as="div"
      variants={fadeInDown}
      className="flex items-center justify-between py-2.5 border-b border-border last:border-0 hover:-translate-x-1 duration-300"
    >
      <div>
        <p className="text-sm font-semibold">{session.eventId.title}</p>
        <p className="text-xs text-muted-foreground">{session.endReason}</p>
      </div>

      <div className="flex flex-col items-center">
        <p className="font-black">{session.finalScore}</p>
      </div>
    </Motion>
  );
}
