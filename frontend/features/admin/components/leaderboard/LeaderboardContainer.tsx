import Error from "@/app/error";
import { getSeasonLeaderboard } from "../../api/seasons";
import LeaderboardTable from "./LeaderboardTable";

interface LeaderboardContainerProps {
  seasonId: string;
  searchParams: {
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  };
}

const LeaderboardContainer = async ({
  seasonId,
  searchParams,
}: LeaderboardContainerProps) => {
  const leaderboardRes = await getSeasonLeaderboard(seasonId);

  if (!leaderboardRes.success) return <Error />;

  const entries = leaderboardRes.data.leaderboard;

  const search = searchParams.search?.trim().toLocaleLowerCase("ar") ?? "";
  const filtered = search
    ? entries.filter((entry) =>
        entry.teamName.toLocaleLowerCase("ar").includes(search),
      )
    : entries;

  const sort = searchParams.sort ?? "pointsDesc";
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "pointsAsc":
        return a.seasonPoints - b.seasonPoints;
      case "nameAsc":
        return a.teamName.localeCompare(b.teamName, "ar");
      case "nameDesc":
        return b.teamName.localeCompare(a.teamName, "ar");
      case "playedDesc":
        return b.sessionsPlayed - a.sessionsPlayed;
      case "playedAsc":
        return a.sessionsPlayed - b.sessionsPlayed;
      default:
        return b.seasonPoints - a.seasonPoints;
    }
  });

  const limit = Number(searchParams.limit) || 10;
  const currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.max(1, Math.ceil(sorted.length / limit));
  const page = Math.min(currentPage, totalPages);
  const leaderboard = sorted.slice((page - 1) * limit, page * limit);

  return (
    <LeaderboardTable
      leaderboard={leaderboard}
      totalResults={sorted.length}
      totalPages={totalPages}
      currentPage={page}
      limit={limit}
    />
  );
};

export default LeaderboardContainer;