import MembersList from "./members-list/MemberList";
import TeamHeader from "./team-header/TeamHeader";
import TeamData from "./stats/TeamData";
import NoTeam from "@/components/shared/no-team/NoTeam";

import { Suspense } from "react";

import { getCurrentTeam } from "@/shared/api/helpers";

import TeamDataSkeleton from "./TeamDataSkeleton";

import Error from "@/app/error";

const TeamContainer = async () => {
  const teamRes = await getCurrentTeam();

  if (!teamRes.success) {
    return <Error />;
  }

  // NOTE: Here is the new response in --> teamRes.data.team => {team, members, myRole, rank}
  const teamData = teamRes.data.team;
  const teamMembers = teamRes.data.team.members;

  if (!teamData) return <NoTeam />;

  return (
    <div className="h-full space-y-6">
      {/* Header: Team identity, rank, actions */}
      <TeamHeader teamData={teamData} />

      {/* Two-column layout: Members + Activity on wider screens */}
      <MembersList members={teamMembers} />

      <Suspense fallback={<TeamDataSkeleton />}>
        <TeamData />
      </Suspense>
    </div>
  );
};

export default TeamContainer;
