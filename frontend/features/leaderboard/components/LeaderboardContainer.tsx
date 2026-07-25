import { PodiumSection } from "./PodiumSection";
import { getCurrentEvent, getLeaderboard } from "@/shared/api/helpers";
import LeaderboardHeader from "./LeaderboardHeader";
import Error from "@/app/error";
import { LeaderboardList } from "./LeaderboardList";
import { revalidatePath } from "next/cache";

// Server Action to refresh data
async function refreshLeaderboard() {
  "use server";
  revalidatePath("/leaderboard");
}

export async function LeaderboardContainer() {
  const currentEventRes = await getCurrentEvent();
  if (!currentEventRes.success) {
    return <Error />;
  }
  const event = currentEventRes.data.event;

  const leaderboardRes = await getLeaderboard(event._id);
  if (!leaderboardRes.success) return <Error />;

  const data = leaderboardRes.data;

  let ranking = [];
  let myTeam = null;

  if (data.leaderboard && data.leaderboard.ranking) {
    ranking = data.leaderboard.ranking;
    myTeam = data.leaderboard.myTeamRanking?.team || null;
  } else if (data.leaderboard && Array.isArray(data.leaderboard)) {
    ranking = data.leaderboard;
  } else {
    return <Error />;
  }

  if (ranking.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md rounded-xl border border-dashed p-8 text-center">
          <h2 className="text-xl font-bold">لسه مفيش نتائج</h2>

          <p className="mt-2 text-muted-foreground">
            أول فريق يخلص اللعبة هيتصدر القائمة هنا.
          </p>
        </div>
      </div>
    );
  }

  const topThree = ranking.slice(0, 3);
  const remainingTeams = ranking.slice(3);

  return (
    <section className="bg-background min-h-screen text-foreground px-4 md:px-8 relative overflow-hidden">
      <LeaderboardHeader refreshAction={refreshLeaderboard} />
      <PodiumSection topThree={topThree} />
      <LeaderboardList remainingTeams={remainingTeams} myTeam={myTeam} />
    </section>
  );
}
