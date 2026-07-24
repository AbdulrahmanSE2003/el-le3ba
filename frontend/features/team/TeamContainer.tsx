import MembersList from "./components/members-list/MemberList";
import TeamHeader from "./components/TeamHeader";
import TeamData from "./components/TeamData";
import { Suspense } from "react";
import NoTeam from "@/components/shared/no-team/NoTeam";
import { getCurrentTeam } from "@/shared/api/helpers";
import TeamDataSkeleton from "./components/TeamDataSkeleton";
import Error from "@/app/error";

const TeamContainer = async () => {
  const teamRes = await getCurrentTeam();
  console.log(teamRes);

  if (!teamRes.success) {
    return <Error />;
  }

  if (!teamRes.data.team.team) return <NoTeam />;

  const teamData = teamRes.data.team.team;
  const teamMembers = teamRes.data.team;

  return (
    <div className="h-full space-y-6">
      {/* Header: Team identity, rank, actions */}
      <TeamHeader teamName={teamData.teamName} />

      {/* Two-column layout: Members + Activity on wider screens */}
      <MembersList members={teamMembers} />

      <Suspense fallback={<TeamDataSkeleton />}>
        <TeamData />
      </Suspense>
    </div>
  );
};

export default TeamContainer;
