import PageHeader from "@/features/admin/components/leaderboard/PageHeader";
import LeaderboardContainer from "@/features/admin/components/leaderboard/LeaderboardContainer";
import LeaderboardStats from "@/features/admin/components/leaderboard/LeaderboardStats";
import LeaderboardStatsSkeleton from "@/features/admin/components/leaderboard/LeaderboardStatsSkeleton";
import SeasonSelector from "@/features/admin/components/leaderboard/SeasonSelector";
import { getAllSeasonsSimple } from "@/features/admin/api/seasons";
import { Suspense } from "react";
import CreateReport from "@/components/shared/CreateReport";
import SearchBar from "@/components/shared/SearchBar";
import SortSelect from "@/components/shared/SortSelect";

interface LeaderboardPageProps {
  searchParams: Promise<{
    seasonId?: string;
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function LeaderboardPage({ searchParams }: LeaderboardPageProps) {
  const params = await searchParams;

  const seasonsRes = await getAllSeasonsSimple();
  const seasons = seasonsRes.success
    ? seasonsRes.data.seasons.seasons
    : [];

  const selectedSeasonId =
    params.seasonId ||
    seasons.find((s) => s.status === "active")?._id ||
    seasons[0]?._id;

  return (
    <div className="space-y-6">
      <div className={`flex justify-between items-center`}>
        <PageHeader />
        
        <div className={`flex items-center gap-3`}>
          <SeasonSelector
            seasons={seasons}
            selectedSeasonId={selectedSeasonId}
          />
          <CreateReport />
        </div>
      </div>

      {selectedSeasonId && (
        <>
          <Suspense key={`stats-${selectedSeasonId}`} fallback={<LeaderboardStatsSkeleton />}>
            <LeaderboardStats seasonId={selectedSeasonId} />
          </Suspense>

          <div className="flex max-sm:flex-col gap-3 items-center justify-between">
            <SearchBar placeholder="ابحث باسم الفريق..." />
            <SortSelect
              placeholder="الترتيب"
              label="ترتيب حسب"
              options={[
                { value: "pointsDesc", label: "الأعلى نقاطًا" },
                { value: "pointsAsc", label: "الأقل نقاطًا" },
                { value: "nameAsc", label: "اسم الفريق (أ - ي)" },
                { value: "nameDesc", label: "اسم الفريق (ي - أ)" },
                { value: "playedDesc", label: "الأكثر مباريات" },
                { value: "playedAsc", label: "الأقل مباريات" },
              ]}
            />
          </div>

          <LeaderboardContainer seasonId={selectedSeasonId} searchParams={params} />
        </>
      )}
    </div>
  );
}
