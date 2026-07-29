import { Metadata } from "next";
import PageHeader from "@/features/admin/components/profile/PageHeader";
import ProfileOverview from "@/features/admin/components/profile/ProfileOverview";
import AccountStats from "@/features/admin/components/profile/AccountStats";
import RecentActivity from "@/features/admin/components/profile/RecentActivity";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "الملف الشخصي | الإدارة",
  description: "إدارة بيانات الحساب والإعدادات الشخصية",
};

export default function ProfilePage() {
  return (
    <section
      className="flex flex-col gap-y-6 text-foreground bg-background dir-rtl"
      dir="rtl"
    >
      {/* Page Header */}
      <PageHeader />

      {/* Profile Overview (Password & Details) */}

      <ProfileOverview />

      {/* Account Statistics */}
      <AccountStats />

      {/* Recent Activity */}
      <RecentActivity />
    </section>
  );
}
