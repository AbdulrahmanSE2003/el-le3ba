"use client";
import type { Team } from "@/shared/types/team";
import { Flame, Gamepad2, Star } from "lucide-react";
import StatCard from "./StatCard";

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
          className={idx === stats.length - 1 ? "max-sm:col-span-2" : ""}
        />
      ))}
    </div>
  );
};

export default StatsCards;
