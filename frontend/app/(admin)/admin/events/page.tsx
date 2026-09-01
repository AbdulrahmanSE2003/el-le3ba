import DataFilter from "@/components/shared/DataFilter";
import SearchBar from "@/components/shared/SearchBar";
import SortSelect from "@/components/shared/SortSelect";
import PageHeader from "@/features/admin/components/events/PageHeader";
import EventsContainer from "@/features/admin/components/events/EventsContainer";
import EventsStats from "@/features/admin/components/events/EventsStats";
import { getAllSeasons } from "@/features/admin/api/events";
import { Suspense } from "react";
import EventsStatsSkeleton from "@/features/admin/components/events/EventsStatsSkeleton";
import { log } from "console";

interface EventsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;

  const seasonsRes = await getAllSeasons();
  const seasons = seasonsRes.success
    ? seasonsRes.data.seasons.seasons
    : [];

    


  return (
    <div className="space-y-6">
      <PageHeader seasons={seasons} />

      <Suspense fallback={<EventsStatsSkeleton/>}>
        <EventsStats />
      </Suspense>

      <div className="flex max-sm:flex-col gap-3 items-center justify-between">
        <SearchBar placeholder="بحث بإسم الحدث..." />

        <div className="flex max-sm:flex-col max-sm:w-full items-center gap-3">
          <DataFilter
            queryKey="status"
            placeholder="الحالة"
            label="حالة الحدث"
            options={[
              { label: "قادم", value: "scheduled" },
              { label: "نشط", value: "running" },
              { label: "منتهي", value: "finished" },
            ]}
          />

          <SortSelect
            placeholder="ترتيب الأحداث"
            label="ترتيب الأحداث"
            options={[
              { label: "الأحدث", value: "-createdAt" },
              { label: "الأقدم", value: "createdAt" },
              { label: "وقت البداية - الأقرب", value: "startTime" },
              { label: "وقت البداية - الأبعد", value: "-startTime" },
              { label: "وقت النهاية - الأقرب", value: "endTime" },
              { label: "وقت النهاية - الأبعد", value: "-endTime" },
              { label: "الاسم تصاعديًا", value: "title" },
              { label: "الاسم تنازليًا", value: "-title" },
            ]}
          />
        </div>
      </div>

      <EventsContainer searchParams={params} />
    </div>
  );
}
