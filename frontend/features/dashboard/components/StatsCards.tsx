"use client";
import { Team } from "@/features/match/types";
import { Flame, Gamepad2, Star } from "lucide-react";
import StatCard from "./StatCard";
import { useUserStore } from "@/store/userStore";

// Reusable sub-component to eliminate duplicate markup

const StatsCards = ({
  team,
  bestStreak = 0,
}: {
  team: Team;
  bestStreak: number;
}) => {
  const stats = [
    {
      label: "إجمالي النقاط",
      value: team.points,
      Icon: Star,
    },
    {
      label: "أعلى ستريك",
      value: bestStreak,
      Icon: Flame,
    },
    {
      label: "عدد الجيمز",
      value: team.totalGames,
      Icon: Gamepad2,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <StatCard
          key={idx}
          label={stat.label}
          value={stat.value}
          Icon={stat.Icon}
        />
      ))}
    </div>
  );
};

export default StatsCards;
