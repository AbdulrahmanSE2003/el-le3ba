import PageHeader from "@/features/admin/components/shared/PageHeader";
import AddAdmin from "@/features/super-admin/components/admins/AddAdmin";
import AdminsStatsCards from "@/features/super-admin/components/admins/AdminsStatsCards";
import { Suspense } from "react";
import StatsCardsSkeleton from "@/features/admin/components/StatsCardsSkeleton";
import SearchBar from "@/components/shared/SearchBar";
import DataFilter from "@/components/shared/DataFilter";
import SortSelect from "@/components/shared/SortSelect";
import AdminsTable from "@/features/super-admin/components/admins/AdminsTable";
import { getAllAdmins } from "@/features/super-admin/api/shared";
import Error from "@/app/error";
import CreateReport from "@/components/shared/CreateReport";

export type SearchParams = {
  search?: string;
  page?: string;
  limit?: string;
  role?: string;
  sort?: string;
  [key: string]: string | undefined;
};

export default async function AdminsManagementPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });

  const adminsRes = await getAllAdmins(params);
  if (!adminsRes.success) return <Error />;

  return (
    <section className="space-y-6">
      <div className={`flex items-center justify-between`}>
        <PageHeader
          title="إدارة المشرفين"
          description="إدارة المشرفين والصلاحيات"
        />
      <div className={`flex items-center gap-3`}>
                <CreateReport/>
                <AddAdmin />
      </div>
      </div>

      <Suspense fallback={<StatsCardsSkeleton />}>
        <AdminsStatsCards />
      </Suspense>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar placeholder="بحث بالإسم أو الإيميل..." />

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

      <AdminsTable res={adminsRes.data} params={params} />
    </section>
  );
}
