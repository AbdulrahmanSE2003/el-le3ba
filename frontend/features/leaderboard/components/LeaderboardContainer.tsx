"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";
import { PodiumSection } from "./PodiumSection";
import { LeaderboardList } from "./LeaderboardList";
import { LeaderboardUser } from "../types";

// Premium Initial Mock Data mirroring your exact screenshots structure
const initialMockData: LeaderboardUser[] = [
  { rank: 1, name: "فرسان BATU", points: 4850, change: "none" },
  { rank: 2, name: "الصاعقة", points: 3980, change: "none" },
  { rank: 3, name: "النخبة", points: 4200, change: "none" },
  { rank: 4, name: "أبطال الكلية", points: 3750, change: "up", changeValue: 1 },
  { rank: 5, name: "المتحدون", points: 3600, change: "down", changeValue: 2 },
  { rank: 6, name: "رياح الشمال", points: 3420, change: "none" },
  {
    rank: 7,
    name: "الفارس الأزرق",
    points: 3200,
    change: "up",
    changeValue: 3,
  },
  {
    rank: 8,
    name: "أسود المدينة",
    points: 3100,
    change: "down",
    changeValue: 1,
  },
  {
    rank: 9,
    name: "عباقرة إسكندرية",
    points: 2950,
    change: "up",
    changeValue: 1,
  },
  { rank: 10, name: "ذوي الهمم", points: 2900, change: "none" },
  {
    rank: 12,
    name: "فريق النجوم",
    points: 2800,
    change: "up",
    changeValue: 2,
    isUserTeam: true,
  },
];

export function LeaderboardContainer() {
  const [data, setData] = useState<LeaderboardUser[]>(initialMockData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const topThree = data.filter((user) => user.rank <= 3);
  const remainingUsers = data.filter((user) => user.rank > 3);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API fetch refresh trigger
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <section className="py-8 bg-background min-h-screen text-foreground px-4 md:px-8 relative overflow-hidden">
      {/* Upper Layout Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-10">
        <Motion
          as="div"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="space-y-1"
        >
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              المتصدرون
            </h1>
            <span className="inline-flex items-center rounded-full bg-brand-success/10 px-2.5 py-0.5 text-xs font-bold text-brand-success border border-brand-success/20 animate-pulse">
              نشط
            </span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground font-medium">
            بطولة يوليو الكبرى
          </p>
        </Motion>

        {/* Refresh Action Trigger */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-muted-foreground hover:text-brand transition-colors disabled:opacity-50"
        >
          <RotateCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          تحديث
        </button>
      </div>

      {/* Render Dynamic Layout Components */}
      <PodiumSection topThree={topThree} />
      <LeaderboardList remainingUsers={remainingUsers} />
    </section>
  );
}
