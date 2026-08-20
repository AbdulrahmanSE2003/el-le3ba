import DataFilter from "@/components/shared/DataFilter";
import SearchBar from "@/components/shared/SearchBar";
import SortSelect from "@/components/shared/SortSelect";
import PageHeader from "@/features/admin/components/seasons/PageHeader";
import SeasonsContainer from "@/features/admin/components/seasons/SeasonsContainer";
import SeasonsStats from "@/features/admin/components/seasons/SeasonsStats";
import { Suspense } from "react";

interface SeasonsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function SeasonsPage({ searchParams }: SeasonsPageProps) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <PageHeader />

      <Suspense fallback={<div>ss</div>}>
        <SeasonsStats />
      </Suspense>

      <div className="flex max-sm:flex-col gap-3 items-center justify-between">
        <SearchBar placeholder="بحث بإسم الموسم..." />

        <div className="flex max-sm:flex-col max-sm:w-full items-center gap-3">
          <DataFilter
            queryKey="status"
            placeholder="الحالة"
            label="حالة الموسم"
            options={[
              { label: "قادم", value: "upcoming" },
              { label: "نشط", value: "active" },
              { label: "إقصائيات", value: "knockout" },
              { label: "منتهي", value: "ended" },
            ]}
          />

          <SortSelect
            placeholder="ترتيب المواسم"
            label="ترتيب المواسم"
            options={[
              { label: "الأحدث", value: "-createdAt" },
              { label: "الأقدم", value: "createdAt" },
              { label: "تاريخ البداية - الأقرب", value: "startDate" },
              { label: "تاريخ البداية - الأبعد", value: "-startDate" },
              { label: "تاريخ النهاية - الأقرب", value: "endDate" },
              { label: "تاريخ النهاية - الأبعد", value: "-endDate" },
              { label: "الاسم تصاعديًا", value: "title" },
              { label: "الاسم تنازليًا", value: "-title" },
            ]}
          />
        </div>
      </div>

      <SeasonsContainer searchParams={params} />
    </div>
  );
}
