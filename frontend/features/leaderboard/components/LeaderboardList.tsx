"use client";

import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { LeaderboardUser } from "../types";

interface LeaderboardListProps {
  remainingUsers: LeaderboardUser[];
}

export function LeaderboardList({ remainingUsers }: LeaderboardListProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border/60 rounded-3xl shadow-xl shadow-black/5 overflow-hidden">
      {/* Table Header Row */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border text-xs font-bold text-muted-foreground bg-muted/30">
        <div>الفريق</div>
        <div>النقاط</div>
      </div>

      {/* Table Rows Wrapper */}
      <div className="divide-y divide-border/50">
        {remainingUsers.map((user, index) => {
          const isUser = user.isUserTeam;

          return (
            <Motion
              key={user.rank}
              as="div"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              delay={index * 0.05} // Clean stagger animation loop
              className={`flex items-center justify-between px-6 py-[14px] transition-colors ${
                isUser
                  ? "bg-brand/10 dark:bg-brand/20 border-y border-brand/30 text-brand font-bold"
                  : "hover:bg-muted/20 text-foreground"
              }`}
            >
              {/* Right Side Info: Rank, Avatar, Team Name */}
              <div className="flex items-center gap-4">
                {/* Rank Badge */}
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-black text-sm ${
                    isUser
                      ? "bg-brand text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {user.rank}
                </div>

                {/* Team Name */}
                <span
                  className={`text-sm md:text-base font-bold ${isUser ? "text-brand" : "text-foreground"}`}
                >
                  {user.name}{" "}
                  {isUser && (
                    <span className="text-xs font-medium opacity-80">
                      (فريقي)
                    </span>
                  )}
                </span>
              </div>

              {/* Left Side Info: Trend Indicator & Total Score */}
              <div className="flex items-center gap-6">
                {/* Trend Status Tag */}
                <div className="flex items-center text-xs font-bold">
                  {user.change === "up" && (
                    <span className="flex items-center gap-0.5 text-brand-success bg-brand-success/10 px-2 py-0.5 rounded-full">
                      {user.changeValue || 1}{" "}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  )}
                  {user.change === "down" && (
                    <span className="flex items-center gap-0.5 text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">
                      {user.changeValue || 1}{" "}
                      <ArrowDownRight className="h-3 w-3" />
                    </span>
                  )}
                  {user.change === "none" && (
                    <span className="text-muted-foreground/60 px-2">
                      <Minus className="h-3 w-3" />
                    </span>
                  )}
                </div>

                {/* Points */}
                <span className="font-black text-sm md:text-base tabular-nums">
                  {user.points.toLocaleString()}
                </span>
              </div>
            </Motion>
          );
        })}
      </div>
    </div>
  );
}
