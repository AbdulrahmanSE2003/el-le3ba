"use client";

import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";
import { Crown, Medal, Shield } from "lucide-react";
import { LeaderboardUser } from "../types";

interface PodiumSectionProps {
  topThree: LeaderboardUser[];
}

export function PodiumSection({ topThree }: PodiumSectionProps) {
  // Ensure we have data for all 3 positions safely
  const first = topThree.find((u) => u.rank === 1);
  const second = topThree.find((u) => u.rank === 2);
  const third = topThree.find((u) => u.rank === 3);

  return (
    <div className="relative bg-card border border-border/60 rounded-3xl p-8 max-w-4xl mx-auto shadow-xl shadow-black/5 overflow-hidden mb-8">
      {/* Subtle background tech grid layout for the podium box */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />

      {/* Podium Grid Wrapper: Ordered visually as 2nd, 1st, 3rd */}
      <div className="relative z-10 flex flex-col sm:flex-row items-end justify-center gap-6 pt-12 max-w-2xl mx-auto">
        {/* 🥈 2nd Place Column (Silver Style) */}
        {second && (
          <Motion
            as="div"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            delay={0.1}
            className="flex flex-col items-center w-full sm:w-1/3 order-2 sm:order-1"
          >
            <div className="relative mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-500/10 border-2 border-slate-400 dark:border-slate-500 text-slate-700 dark:text-slate-300 font-black text-lg shadow-md">
              {second.name.substring(0, 2)}
              {/* Silver Rank Badge */}
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-400 dark:bg-slate-500 text-[10px] font-black text-white">
                2
              </span>
            </div>
            <span className="font-bold text-foreground text-base mb-1">
              {second.name}
            </span>
            <span className="font-black text-slate-600 dark:text-slate-400 text-sm mb-4">
              {second.points.toLocaleString()}
            </span>
            {/* Podium Base */}
            <div className="w-full h-28 bg-gradient-to-t from-slate-500/10 to-card border-t-3 border-x-3 border-slate-400/30 rounded-t-2xl flex items-center justify-center shadow-inner">
              <Shield className="h-7 w-7 text-slate-400" />
            </div>
          </Motion>
        )}

        {/* 👑 1st Place Column (Gold Style) */}
        {first && (
          <Motion
            as="div"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col items-center w-full sm:w-1/3 order-1 sm:order-2"
          >
            {/* Crown icon on top */}
            <Crown className="h-6 w-6 text-brand-yellow animate-pulse mb-1" />
            <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow/10 border-4 border-brand-yellow text-brand-yellow-dark dark:text-brand-yellow font-black text-xl shadow-lg shadow-brand-yellow/10">
              {first.name.substring(0, 2)}
              {/* Gold Rank Badge */}
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-[10px] font-black text-brand-dark-bg">
                1
              </span>
            </div>
            <span className="font-black text-foreground text-lg mb-1 tracking-tight">
              {first.name}
            </span>
            <span className="font-black text-brand-yellow text-base mb-4">
              {first.points.toLocaleString()}
            </span>
            {/* Podium Base with Premium Yellow Glow */}
            <div className="w-full h-36 bg-gradient-to-t from-brand-yellow/10 to-brand-yellow/5 border-t-4 border-x-4 border-brand-yellow/30 rounded-t-2xl flex items-center justify-center shadow-lg shadow-brand-yellow/5 relative overflow-hidden">
              <div className="absolute -bottom-10 h-24 w-24 bg-brand-yellow/30 rounded-full blur-xl" />
              <Crown className="h-9 w-9 text-brand-yellow/40 relative z-10" />
            </div>
          </Motion>
        )}

        {/* 🥉 3rd Place Column (Bronze Style) */}
        {third && (
          <Motion
            as="div"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            delay={0.2}
            className="flex flex-col items-center w-full sm:w-1/3 order-3"
          >
            <div className="relative mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-700/10 border-2 border-amber-600 dark:border-amber-700 text-amber-800 dark:text-amber-500 font-black text-lg shadow-md">
              {third.name.substring(0, 2)}
              {/* Bronze Rank Badge */}
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 dark:bg-amber-700 text-[10px] font-black text-white">
                3
              </span>
            </div>
            <span className="font-bold text-foreground text-base mb-1">
              {third.name}
            </span>
            <span className="font-black text-amber-700 dark:text-amber-500 text-sm mb-4">
              {third.points.toLocaleString()}
            </span>
            {/* Podium Base */}
            <div className="w-full h-24 bg-gradient-to-t from-amber-700/10 to-card border-t-2 border-x-2 border-amber-600/30 rounded-t-2xl flex items-center justify-center shadow-inner">
              <Medal className="h-7 w-7 text-amber-600" />
            </div>
          </Motion>
        )}
      </div>
    </div>
  );
}
