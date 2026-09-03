import Error from "@/app/error";
import { getSeasonLeaderboard } from "../../api/seasons";
import LeaderboardTable from "./LeaderboardTable";

const LeaderboardContainer = async ({ seasonId }: { seasonId: string }) => {
  const leaderboardRes = await getSeasonLeaderboard(seasonId);

  if (!leaderboardRes.success) return <Error />;

  const leaderboard = leaderboardRes.data.leaderboard;

  return <LeaderboardTable leaderboard={leaderboard} />;
};

export default LeaderboardContainer;
