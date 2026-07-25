"use client";

import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";
import { LeaderboardEntry } from "@/shared/api/helpers";

interface LeaderboardListProps {
  remainingTeams: LeaderboardEntry[];
  myTeam: LeaderboardEntry | null;
}

export function LeaderboardList({
  remainingTeams,
  myTeam,
}: LeaderboardListProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border/60 rounded-3xl shadow-xl shadow-black/5 overflow-hidden">
      {/* Table Header Row */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border text-xs font-bold text-muted-foreground bg-muted/30">
        <div>الفريق</div>
        <div>النقاط</div>
      </div>

      {/* Table Rows Wrapper */}
      <div className="divide-y divide-border/50">
        {remainingTeams.map((team, index) => {
          const isMyTeam = team._id === myTeam?._id;

          return (
            <Motion
              key={team._id}
              as="div"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              delay={index * 0.05} // Clean stagger animation loop
              className={`flex items-center justify-between px-6 py-3.5 transition-colors ${
                isMyTeam
                  ? "bg-brand/10 dark:bg-brand/20 border-x border-x-border border-y border-y-brand/30 text-brand font-bold"
                  : "hover:bg-muted/20 text-foreground"
              }`}
            >
              {/* Right Side Info: Rank, Avatar, Team Name */}
              <div className="flex items-center gap-4">
                {/* Rank Badge */}
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-black text-sm ${
                    isMyTeam
                      ? "bg-brand text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 4}
                </div>

                {/* Team Name */}
                <span
                  className={`text-sm md:text-base font-bold ${isMyTeam ? "text-brand" : "text-foreground"}`}
                >
                  {team.teamId?.teamName}{" "}
                  {isMyTeam && (
                    <span className="text-xs font-medium opacity-80">
                      (فريقي)
                    </span>
                  )}
                </span>
              </div>

              {/* Left Side Info: Trend Indicator & Total Score */}
              <div className="flex items-center gap-6">
                {/* Points */}
                <span className="font-black text-sm md:text-base tabular-nums">
                  {team.totalPoints.toLocaleString()}
                </span>
              </div>
            </Motion>
          );
        })}
      </div>
    </div>
  );
}
