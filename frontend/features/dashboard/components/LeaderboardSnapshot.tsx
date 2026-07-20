import Link from "next/link";
import { Trophy, Crown } from "lucide-react";
import { LeaderboardTopThreeRes } from "./Homepage";
import { cn } from "@/lib/utils";
import { formatPoints } from "@/lib/utils"; // Import your points formatting function

type LeaderboardRow = LeaderboardTopThreeRes["topThree"][number];

interface LeaderboardSnapshotProps {
  rows: LeaderboardRow[];
}

const LeaderboardSnapshot = ({ rows }: LeaderboardSnapshotProps) => {
  // Styles for the rank badges based on positioning
  const getRankStyles = (index: number) => {
    switch (index) {
      case 0:
        return "bg-amber-400/30 text-amber-300 border border-amber-200/30 scale-105 shadow-sm shadow-amber-500/5";
      case 1:
        return "bg-slate-400/15 text-slate-400 border border-slate-400/20";
      case 2:
        return "bg-amber-700/15 text-amber-700 border border-amber-700/20";
      default:
        return "bg-muted text-muted-foreground border border-muted-foreground/10";
    }
  };

  return (
    <div className="rounded-xl border border-primary/20 bg-background p-6 shadow-sm">
      {/* Header Container */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/leaderboard"
          className="font-display text-xs font-bold text-primary/80 hover:text-primary hover:underline transition-colors"
        >
          عرض الكل
        </Link>

        <div className="flex items-center gap-2">
          <Trophy className="size-5 text-accent animate-pulse" />
          <span className="font-display text-base font-bold text-foreground">
            متصدري الترتيب
          </span>
        </div>
      </div>

      {/* Rows Container */}
      <div className="space-y-2.5">
        {rows.map((row, index) => (
          <div
            key={row._id}
            className={cn(
              "flex flex-row-reverse items-center justify-between rounded-xl px-4 py-3.5 border transition-all duration-200",
              index === 0
                ? "bg-linear-to-l from-amber-500/3 to-transparent border-amber-500/20 hover:border-amber-500/30"
                : "border-muted/40 hover:border-primary/20 hover:bg-muted/30",
            )}
          >
            {/* Left Side: Points Status */}
            <div className="flex items-center gap-1.5">
              <span className="font-display text-base font-black tracking-tight tabular-nums text-foreground">
                {formatPoints(row.totalPoints)}
              </span>
            </div>

            {/* Right Side: Badge & Info */}
            <div className="flex items-center gap-3.5 flex-row-reverse">
              {/* Team Visual Metadata */}
              <div className="text-right">
                <p
                  className={cn(
                    "font-display font-bold text-sm tracking-tight",
                    index === 0 ? "text-foreground" : "text-foreground/90",
                  )}
                >
                  {row.teamId.teamName}
                </p>
              </div>
              {/* Rank Badge Indicator */}
              <div
                className={cn(
                  "size-8 rounded-full flex items-center justify-center font-display text-sm font-black select-none",
                  getRankStyles(index),
                )}
              >
                {index === 0 ? (
                  <Crown className="size-4 stroke-[2.5]" />
                ) : (
                  index + 1
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardSnapshot;
