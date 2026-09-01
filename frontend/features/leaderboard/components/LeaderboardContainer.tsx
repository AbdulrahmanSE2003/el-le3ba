import { PodiumSection } from "./PodiumSection";
import {
  getCurrentEvent,
  getLeaderboard,
  getActiveSeason,
  getSeasonLeaderboard,
  type LeaderboardEntry,
} from "@/shared/api/helpers";
import LeaderboardHeader from "./LeaderboardHeader";
import NoActiveEvent from "@/components/shared/NoActiveEvent";
import Error from "@/app/error";
import { LeaderboardList } from "./LeaderboardList";
import { revalidatePath } from "next/cache";
import { LeaderboardEmptyState } from "./LeaderboardEmptyState";

// Server Action to refresh data
async function refreshLeaderboard() {
  "use server";
  revalidatePath("/leaderboard");
}



function normalizeSeasonEntry(entry: {
  teamId: string;
  teamName: string;
  seasonPoints: number;
}): LeaderboardEntry {
  return {
    _id: entry.teamId,
    teamId: {
      _id: entry.teamId,
      teamName: entry.teamName,
      teamCode: "",
    },
    eventId: "",
    totalPoints: entry.seasonPoints,
    sessionsPlayed: 0,
  };
}

function SeasonLeaderboardView({ ranking, seasonTitle }: { ranking: LeaderboardEntry[]; seasonTitle: string }) {
  const topThree = ranking.slice(0, 3);
  const remainingTeams = ranking.slice(3);

  return (
    <section className="bg-background min-h-screen text-foreground px-4 md:px-8 relative overflow-hidden">
      <LeaderboardHeader refreshAction={refreshLeaderboard} seasonTitle={seasonTitle} isSeason />
      <PodiumSection topThree={topThree} />
      <LeaderboardList remainingTeams={remainingTeams} myTeam={null} />
    </section>
  );
}

function EventLeaderboardView({ ranking, myTeam }: { ranking: LeaderboardEntry[]; myTeam: LeaderboardEntry | null }) {
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

export async function LeaderboardContainer() {
  const currentEventRes = await getCurrentEvent();

  // ── No running event → try to show the active season leaderboard ──
  if (!currentEventRes.success) {
    const activeSeasonRes = await getActiveSeason();

    if (!activeSeasonRes.success) {
      return <NoActiveEvent type="season" />;
    }

    const season = activeSeasonRes.data.season;

    const seasonLbRes = await getSeasonLeaderboard(season._id);
    if (!seasonLbRes.success) return <Error />;

    const seasonRanking = seasonLbRes.data.leaderboard.map(normalizeSeasonEntry);

    if (seasonRanking.length === 0) {
      return <div className={`h-screen flex items-center justify-center`}>
        <LeaderboardEmptyState />
      </div>;
    }

    return <SeasonLeaderboardView ranking={seasonRanking} seasonTitle={season.title} />;
  }

  // ── Running event exists → keep existing event leaderboard behavior ──
  const event = currentEventRes.data.event;

  const leaderboardRes = await getLeaderboard(event._id);
  if (!leaderboardRes.success) return <Error />;

  const data = leaderboardRes.data;

  let ranking: LeaderboardEntry[] = [];
  let myTeam: LeaderboardEntry | null = null;

  if (data.leaderboard && data.leaderboard.ranking) {
    ranking = data.leaderboard.ranking;
    myTeam = data.leaderboard.myTeamRanking?.team || null;
  } else if (data.leaderboard && Array.isArray(data.leaderboard)) {
    ranking = data.leaderboard;
  } else {
    return <Error />;
  }

  if (ranking.length === 0) {
    return <LeaderboardEmptyState />;
  }

  return <EventLeaderboardView ranking={ranking} myTeam={myTeam} />;
}
