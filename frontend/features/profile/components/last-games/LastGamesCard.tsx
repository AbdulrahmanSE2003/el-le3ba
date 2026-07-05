import { fadeInDown } from "@/components/shared/animations";
import Motion from "@/components/shared/Motion";

interface LastGamesCardProps {
  title: string;
  date: string;
  competitorsCount: number;
  rank: string;
}
export default function LastGamesCard({
  title,
  date,
  competitorsCount,
  rank,
}: LastGamesCardProps) {
  return (
    <Motion
      as="div"
      variants={fadeInDown}
      className="flex items-center justify-between py-2.5 border-b border-border last:border-0 hover:-translate-x-1 duration-300 hover:cursor-pointer"
    >
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>

      <div className="flex flex-col items-center">
        <p className="font-black">{competitorsCount}</p>
        <p
          className={`text-xs px-2 py-0.5 rounded-full font-bold bg-secondary ${rank !== "1" ? "bg-muted-foreground" : "bg-yellow-300 dark:text-black"}`}
        >
          #{rank}
        </p>
      </div>
    </Motion>
  );
}
