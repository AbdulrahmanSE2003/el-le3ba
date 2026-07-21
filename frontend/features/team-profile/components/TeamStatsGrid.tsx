"use client";

import React from "react";
import {
  Trophy,
  Flame,
  Gamepad2,
  Star,
  Target,
  LucideIcon,
} from "lucide-react";
import { TeamStats } from "../types";
import { formatNumber } from "@/components/shared/numbers-format";
import StyleContainer from "@/features/profile/components/StyleContainer";
import Motion from "@/components/shared/Motion";
import { fadeInUp, containerVariants } from "@/components/shared/animations";

interface Props {
  stats: TeamStats;
}

interface StatItem {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export default function TeamStatsGrid({ stats }: Props) {
  const statItems: StatItem[] = [
    {
      title: "إجمالي النقاط",
      value: formatNumber(stats.totalPoints),
      icon: Trophy,
      iconBg: "bg-yellow-500/10 dark:bg-yellow-500/20",
      iconColor: "text-yellow-500",
    },
    {
      title: "المباريات المكتملة",
      value: stats.totalGames,
      icon: Gamepad2,
      iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
      iconColor: "text-blue-500",
    },
    {
      title: "أعلى ستريك",
      value: stats.bestStreak,
      icon: Flame,
      iconBg: "bg-orange-500/10 dark:bg-orange-500/20",
      iconColor: "text-orange-500",
    },
    {
      title: "متوسط السكور",
      value: stats.averageScore,
      icon: Star,
      iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <Motion
      as="div"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-2 gap-4"
    >
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <StyleContainer
            key={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring" }}
            className="flex justify-between items-center p-5 rounded-2xl border border-border shadow-sm bg-white dark:bg-card"
          >
            <div className="flex flex-col gap-1.5 text-right">
              <span className="text-xs font-semibold text-muted-foreground">
                {item.title}
              </span>
              <p className="text-xl md:text-2xl font-black text-foreground">
                {item.value}
              </p>
            </div>

            <div
              className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} border border-current/10`}
            >
              <Icon size={20} />
            </div>
          </StyleContainer>
        );
      })}
    </Motion>
  );
}
