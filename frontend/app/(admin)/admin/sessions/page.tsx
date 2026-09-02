import DataFilter from "@/components/shared/DataFilter";
import SearchBar from "@/components/shared/SearchBar";
import SortSelect from "@/components/shared/SortSelect";
import PageHeader from "@/features/admin/components/sessions/PageHeader";
import SessionsContainer from "@/features/admin/components/sessions/SessionsContainer";
import SessionsStats from "@/features/admin/components/sessions/SessionsStats";
import SessionsStatsSkeleton from "@/features/admin/components/sessions/SessionsStatsSkeleton";
import { Suspense } from "react";

interface SessionsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function SessionsPage({ searchParams }: SessionsPageProps) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <PageHeader />

      <Suspense fallback={<SessionsStatsSkeleton />}>
        <SessionsStats />
      </Suspense>

      <div className="flex max-sm:flex-col gap-3 items-center justify-between">
        <SearchBar placeholder="بحث بإسم الفريق..." />

        <div className="flex max-sm:flex-col max-sm:w-full items-center gap-3">
          <DataFilter
            queryKey="status"
            placeholder="الحالة"
            label="حالة المباراة"
            options={[
              { label: "شغالة", value: "running" },
              { label: "مكتملة", value: "completed" },
              // { label: "مُسجلة", value: "scored" },
            ]}
          />

          <SortSelect
            placeholder="ترتيب المباريات"
            label="ترتيب المباريات"
            options={[
              { label: "الأحدث", value: "-startedAt" },
              { label: "الأقدم", value: "startedAt" },
              { label: "أعلى سكور", value: "-finalScore" },
              { label: "أقل سكور", value: "finalScore" },
            ]}
          />
        </div>
      </div>

      <SessionsContainer searchParams={params} />
    </div>
  );
}
