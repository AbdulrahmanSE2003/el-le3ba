import {
  fetchTeamProfile,
  fetchTeamSessions,
  fetchTeamRank,
  fetchTeamAchievements,
  fetchTeamActivities,
} from "@/features/team-profile/api";
import TeamHeader from "@/features/team-profile/components/TeamHeader";
import TeamStatsGrid from "@/features/team-profile/components/TeamStatsGrid";
import MemberList from "@/features/team-profile/components/MemberList";
import MatchHistoryWrapper from "@/features/team-profile/components/MatchHistoryWrapper";
import AchievementGrid from "@/features/team-profile/components/AchievementGrid";
import ModerationPanel from "@/features/team-profile/components/ModerationPanel";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamProfilePage({ params }: PageProps) {
  const { id } = await params;

  const [profileData, sessionsData, rankData, achievements] =
    await Promise.all([
      fetchTeamProfile(id),
      fetchTeamSessions(id, 1, 10),
      fetchTeamRank(id, "current"),
      fetchTeamAchievements(id),
      fetchTeamActivities(id),
    ]);

  const { team, members } = profileData;

  return (
    <section className="h-full">
      <div className="container mx-auto w-full p-4 space-y-6">
        {/* Header: Team identity, rank, actions */}
        <TeamHeader team={team} rank={rankData.rank} />

        {/* Stats Grid */}
        <TeamStatsGrid stats={team.stats} />

        {/* Admin Moderation Panel */}
        <ModerationPanel team={team} />

        {/* Two-column layout: Members + Activity on wider screens */}
        <div>
          <MemberList members={members} team={team} />
        </div>

        {/* Match History */}
        <MatchHistoryWrapper
          teamId={id}
          initialSessions={sessionsData.sessions}
          initialHasMore={sessionsData.hasMore}
        />

        {/* Achievements */}
        <AchievementGrid achievements={achievements} />
      </div>
    </section>
  );
}
