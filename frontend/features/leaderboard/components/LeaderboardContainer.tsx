/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import { RotateCw, Loader2 } from "lucide-react";
import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";
import { PodiumSection } from "./PodiumSection";
import { LeaderboardList } from "./LeaderboardList";
import { LeaderboardUser } from "../types";
import {
  fetchCurrentEventId,
  fetchLeaderboard,
} from "../api/leaderboardService";

// Single state object instead of multiple separate useState calls,
// so one setState call updates everything at once.
interface LeaderboardState {
  data: LeaderboardUser[];
  isLoading: boolean;
  isRefreshing: boolean;
}

const INITIAL_STATE: LeaderboardState = {
  data: [],
  isLoading: true,
  isRefreshing: false,
};

export function LeaderboardContainer() {
  const [state, setState] = useState<LeaderboardState>(INITIAL_STATE);

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setState((prev) => ({ ...prev, isRefreshing: true }));
    }

    try {
      const eventId = await fetchCurrentEventId();
      const data = await fetchLeaderboard(eventId);
      setState({ data, isLoading: false, isRefreshing: false });
    } catch (error) {
      console.error("Failed to load leaderboard:", error);
      setState((prev) => ({ ...prev, isLoading: false, isRefreshing: false }));
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = () => loadData(true);

  const topThree = state.data.filter((user) => user.rank <= 3);
  const remainingUsers = state.data.filter((user) => user.rank > 3);

  if (state.isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
        <p className="text-sm font-medium">جاري تحميل لوحة الصدارة...</p>
      </div>
    );
  }

  return (
    <section className="bg-background min-h-screen text-foreground px-4 md:px-8 relative overflow-hidden">
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
          disabled={state.isRefreshing}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-muted-foreground hover:text-brand transition-colors disabled:opacity-50"
        >
          <RotateCw
            className={`h-4 w-4 ${state.isRefreshing ? "animate-spin" : ""}`}
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
