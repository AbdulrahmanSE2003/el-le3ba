import PageHeader from "@/features/admin/components/leaderboard/PageHeader";
import LeaderboardContainer from "@/features/admin/components/leaderboard/LeaderboardContainer";
import LeaderboardStats from "@/features/admin/components/leaderboard/LeaderboardStats";
import LeaderboardStatsSkeleton from "@/features/admin/components/leaderboard/LeaderboardStatsSkeleton";
import SeasonSelector from "@/features/admin/components/leaderboard/SeasonSelector";
import { getAllSeasonsSimple } from "@/features/admin/api/seasons";
import { Suspense } from "react";
import CreateReport from "@/components/shared/CreateReport";

interface LeaderboardPageProps {
  searchParams: Promise<{
    seasonId?: string;
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

          <LeaderboardContainer seasonId={selectedSeasonId} />
        </>
      )}
    </div>
  );
}
