import { apiServer } from "@/lib/apiServer";

interface TeamStatsAPIPreviewResponse {
  status: boolean;
  MyRank: {
    rank: number;
    totalPoints: number;
  };
}

const TeamStatsPreview = async ({ eventId }: { eventId: string }) => {
  const rankRes = await apiServer<TeamStatsAPIPreviewResponse>(
    "get",
    `/leaderboard/my-rank?eventId=${eventId}`,
  );

  const { rank, totalPoints } = rankRes.data?.MyRank || {
    rank: 0,
    totalPoints: 0,
  };

  return (
    <div className={`w-full grid md:grid-cols-2 gap-3`}>
      {/* Total Points */}
      <div
        className={`w-full flex flex-col items-center gap-y-4 border border-primary/30 bg-primary/15 " +
      "dark:border-primary/20 dark:bg-primary/5 rounded-lg p-4`}
      >
        <span className={`text-xs text-muted-foreground`}>مجموع النقاط</span>
        <span className={`text-5xl text-accent font-display font-bold`}>
          {" "}
          {totalPoints}
        </span>
      </div>

      {/* Rank */}
      <div
        className={`w-full flex flex-col items-center gap-y-4 border border-primary/30 bg-primary/15 " +
      "dark:border-primary/20 dark:bg-primary/5 rounded-lg p-4`}
      >
        <span className={`text-xs text-muted-foreground`}>الترتيب الحالي</span>
        <span className={`text-5xl text-accent font-display font-bold`}>
          {" "}
          {rank}
        </span>
      </div>
    </div>
  );
};

export default TeamStatsPreview;
