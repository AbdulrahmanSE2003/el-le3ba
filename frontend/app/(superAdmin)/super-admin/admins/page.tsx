import PageHeader from "@/features/admin/components/shared/PageHeader";
import AddAdmin from "@/features/super-admin/components/admins/AddAdmin";
import AdminsTable from "@/features/super-admin/components/admins/AdminsTable";
import AdminsStatsCards from "@/features/super-admin/components/admins/AdminsStatsCards";
import { Suspense } from "react";
import StatsCardsSkeleton from "@/features/admin/components/StatsCardsSkeleton";
import SearchBar from "@/components/shared/SearchBar";
import DataFilter from "@/components/shared/DataFilter";
import SortSelect from "@/components/shared/SortSelect";

export type SearchParams = {
  search?: string;
  page?: string;
  limit?: string;
  sort?: string;

  [key: string]: string | undefined;
};

export default async function AdminsManagementPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar placeholder="بحث بالإسم أو الإيميل..." />

        {/* Filter by Role */}
        <DataFilter
          queryKey="role"
          placeholder="الصلاحية"
          label="الصلاحيات"
          options={[
            { label: "مشرف", value: "admin" },
            { label: "سوبر أدمن", value: "superAdmin" },
          ]}
        />

        <SortSelect
          options={[
            { label: "الأحدث", value: "newest" },
            { label: "الأقدم", value: "oldest" },
            { label: "أبجدي (أ - ي)", value: "nameAsc" },
            { label: "عكسي (ي - أ)", value: "nameDesc" },
          ]}
        />
      </div>

      {/* Table */}
      <AdminsTable params={params} />
    </section>
  );
}
