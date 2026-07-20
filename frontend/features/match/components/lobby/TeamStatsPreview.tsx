import { getMyRank } from "@/shared/api/helpers";

const TeamStatsPreview = async ({ eventId }: { eventId: string }) => {
  const result = await getMyRank(eventId);

  const { rank, totalPoints } = result.success
    ? result.data.MyRank
    : { rank: 0, totalPoints: 0 };

  return (
    <div className="w-full grid md:grid-cols-2 gap-3">
      <div className="w-full flex flex-col items-center gap-y-4 border border-primary/30 bg-primary/15 dark:border-primary/20 dark:bg-primary/5 rounded-lg p-4">
        <span className="text-xs text-muted-foreground">مجموع النقاط</span>
        <span className="text-5xl text-accent font-display font-bold">
          {totalPoints}
        </span>
      </div>

      <div className="w-full flex flex-col items-center gap-y-4 border border-primary/30 bg-primary/15 dark:border-primary/20 dark:bg-primary/5 rounded-lg p-4">
        <span className="text-xs text-muted-foreground">الترتيب الحالي</span>
        <span className="text-5xl text-accent font-display font-bold">
          {rank}
        </span>
      </div>
    </div>
  );
};

export default TeamStatsPreview;
