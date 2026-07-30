import Stats from "@/features/super-admin/components/Stats";
import MainContent from "@/features/super-admin/components/MainContent";
import NewAdmins from "@/features/super-admin/components/NewAdmins";
import { Suspense } from "react";
import StatsCardsSkeleton from "@/features/admin/components/StatsCardsSkeleton";

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

      {/* Main Content Grid */}
      <MainContent />

      {/* Newest Admins Table */}
      <NewAdmins />
    </div>
  );
}
