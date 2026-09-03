import React, { Suspense } from "react";
import PageHeader from "@/features/admin/components/shared/PageHeader";
import RecentSessions from "@/features/admin/components/RecentSessions";
import QuickActions from "@/features/admin/components/QuickActions";
import DashboardStats from "@/features/admin/components/DashboardStats";
import RecentSessionsSkeleton from "@/features/admin/components/RecentSessionsSkeleton";
import { Metadata } from "next";
import StatsCardsSkeleton from "@/features/admin/components/StatsCardsSkeleton";

export const metadata: Metadata = {
  title: "لوحة التحكم | الإدارة",
  description: "نظرة عامة على أداء النظام والأنشطة الأخيرة.",
};

const Page = () => {
  return (
    <section className="flex flex-col gap-y-6 text-foreground bg-background">
      {/* Header */}
      <PageHeader
        title="لوحة التحكم"
        description="نظرة عامة على أداء النظام والأنشطة الأخيرة."
      />

      {/* KPI Stats Grid */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <DashboardStats />
      </Suspense>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sessions List */}
        <Suspense fallback={<RecentSessionsSkeleton />}>
          <RecentSessions />
        </Suspense>

        {/* Quick Actions Container */}
        <QuickActions />
      </div>
    </section>
  );
};

export default Page;
