import TeamHeader from "@/features/team-profile/components/team-header/TeamHeader";
import TeamStatsGrid from "@/features/team-profile/components/stats/TeamStatsGrid";
import MemberList from "@/features/team-profile/components/members-list/MemberList";
import MatchHistoryWrapper from "@/features/team-profile/components/MatchHistoryWrapper";
import AchievementGrid from "@/features/team-profile/components/AchievementGrid";
import ModerationPanel from "@/features/team-profile/components/ModerationPanel";

export default async function TeamProfilePage({
  params,
}: {
  params: Promise<any>;
}) {
  const { id } = await params;

  return (
    <section className="h-full space-y-6">
      {/* Header: Team identity, rank, actions */}
      <TeamHeader teamId={id} />

      {/* Stats Grid */}
      <TeamStatsGrid />

      {/* Admin Moderation Panel */}
      {/* <ModerationPanel /> */}

      {/* Two-column layout: Members + Activity on wider screens */}
      <MemberList />

      {/* Match History */}
      <MatchHistoryWrapper />

      {/* Achievements */}
      <AchievementGrid />
    </section>
  );
}
