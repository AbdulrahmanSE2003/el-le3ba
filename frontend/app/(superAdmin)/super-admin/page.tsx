import Stats from "@/features/super-admin/components/Stats";
import MainContent from "@/features/super-admin/components/MainContent";
import NewAdmins from "@/features/super-admin/components/NewAdmins";
import { Suspense } from "react";
import StatsCardsSkeleton from "@/features/admin/components/StatsCardsSkeleton";
import GamesOverTime from "@/features/super-admin/components/charts/GamesOverTime";
import { Skeleton } from "@/components/ui/skeleton";

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
<Suspense fallback={<Skeleton className={`h-96 col-span-4 rounded-2xl`}/>}>
  <GamesOverTime/> 
</Suspense >               
<div className={`bg-rose-500 col-span-2 rounded-2xl h-96`}>ss</div>
          <div className={`bg-emerald-500 col-span-2 rounded-2xl h-96`}>ss</div>
          <div className={`bg-fuchsia-500 col-span-4 rounded-2xl h-96`}>ss</div>
      </div>
      <div className={`bg-violet-500  rounded-2xl h-96`}>ss</div>

      {/* Main Content Grid */}
      <MainContent />

      {/* Newest Admins Table */}
      <Suspense fallback={<div className={``}>ss</div>}>
        <NewAdmins />
      </Suspense>
    </div>
  );
}
