import React, { Suspense } from "react";
import PageHeader from "@/features/admin/components/shared/PageHeader";
import RecentSessions from "@/features/admin/components/RecentSessions";
import QuickActions from "@/features/admin/components/QuickActions";
import DashboardStats from "@/features/admin/components/DashboardStats";
import { Skeleton } from "@/components/ui/skeleton";
import RecentSessionsSkeleton from "@/features/admin/components/RecentSessionsSkeleton";
import { Metadata } from "next";

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
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className={`h-32 w-full`} />
            <Skeleton className={`h-32 w-full`} />
            <Skeleton className={`h-32 w-full`} />
            <Skeleton className={`h-32 w-full`} />
          </div>
        }
      >
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
