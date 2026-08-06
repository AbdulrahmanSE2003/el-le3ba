import PageHeader from "@/features/admin/components/shared/PageHeader";
import AddAdmin from "@/features/super-admin/components/admins/AddAdmin";
import Toolbar from "@/features/super-admin/components/admins/Toolbar";
import AdminsTable from "@/features/super-admin/components/admins/AdminsTable";
import AdminsStatsCards from "@/features/super-admin/components/admins/AdminsStatsCards";
import { Suspense } from "react";
import StatsCardsSkeleton from "@/features/admin/components/StatsCardsSkeleton";

export default function AdminsManagementPage() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <PageHeader
          title="إدارة المشرفين"
          description="إضافة، تعديل، وإدارة صلاحيات المشرفين على المنصة"
        />
        <AddAdmin />
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <AdminsStatsCards />
      </Suspense>

      {/* Toolbar */}
      <Toolbar />

      {/* Table */}
      <AdminsTable />
    </section>
  );
}
