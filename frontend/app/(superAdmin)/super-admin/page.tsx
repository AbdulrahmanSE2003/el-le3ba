import Stats from "@/features/super-admin/components/Stats";
import MainContent from "@/features/super-admin/components/MainContent";
import NewAdmins from "@/features/super-admin/components/NewAdmins";
import { Suspense } from "react";
import StatsCardsSkeleton from "@/features/admin/components/StatsCardsSkeleton";
import GamesOverTime from "@/features/super-admin/components/charts/GamesOverTime";
import { Skeleton } from "@/components/ui/skeleton";
import TeamsPerformance from "@/features/super-admin/components/charts/TeamsPerformance";
import { TopPlayersList } from "@/features/super-admin/components/charts/TopPlayers";
import { GameOutcomesChart } from "@/features/super-admin/components/charts/GameOutcomesChart";
import { LiveSessionsWidget } from "@/features/super-admin/components/charts/LiveSessionsWidget";

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            لوحة تحكم المسؤول الرئيسي
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            نظرة عامة على نشاط النظام والإحصائيات الحالية داخل اللعبة
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <Stats />
      </Suspense>

      <div className={`grid grid-cols-6 gap-4`}>
          <Suspense fallback={<Skeleton className={`h-104 col-span-4 rounded-2xl`}/>}>
            <GamesOverTime/> 
          </Suspense> 
          <Suspense fallback={<Skeleton className={`h-104 col-span-2 rounded-2xl`}/>} >
            <TeamsPerformance/>
          </Suspense>
          <Suspense fallback={<Skeleton className={`h-104 col-span-2 rounded-2xl`}/>}>
            <TopPlayersList players={[
  {
    userId: "6a9f0ce8b08899b8a3e0efbb",
    name: "Student 001",
    totalScore: 495,
    team: { teamName: "Alpha" }
  },
  {
    userId: "6a9f0cf0b08899b8a3e0efc8",
    name: "Student 014",
    totalScore: 428,
    team: { teamName: "November" }
  },
  {
    userId: "6a9f0cf9b08899b8a3e0efd7",
    name: "Student 029",
    totalScore: 390,
    team: { teamName: "Bravo" }
  },
  {
    userId: "6a9f0d02b08899b8a3e0efe6",
    name: "Student 044",
    totalScore: 310,
    team: { teamName: "Delta" }
  },
  {
    userId: "6a9f0d0ab08899b8a3e0eff5",
    name: "Student 059",
    totalScore: 280,
    team: { teamName: "Echo" }
  }
]}/>
          </Suspense>
<Suspense fallback={<Skeleton className={`h-104 col-span-2 rounded-2xl`}/>} >
<GameOutcomesChart/>
</Suspense> 
<Suspense>
  <LiveSessionsWidget count={0}/>
</Suspense>
     </div>

      {/* Main Content Grid */}
      <MainContent />

      {/* Newest Admins Table */}
      <Suspense fallback={<div className={``}>ss</div>}>
        <NewAdmins />
      </Suspense>
    </div>
  );
}
