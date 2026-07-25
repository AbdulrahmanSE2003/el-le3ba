import { Suspense } from "react";

import MembersList from "./members-list/MemberList";
import TeamHeader from "./team-header/TeamHeader";
import TeamData from "./stats/TeamData";
import NoTeam from "@/components/shared/no-team/NoTeam";

import TeamDataSkeleton from "./TeamDataSkeleton";

import { getCurrentTeam } from "@/shared/api/helpers";

import Error from "@/app/error";

const TeamContainer = async () => {
  const teamRes = await getCurrentTeam();

  // Handle server fetch failure
  if (!teamRes.success) {
    return <Error />;
  }

  // Handle case where user is not currently in a team
  if (!teamRes.data.team.team) {
    return <NoTeam />;
  }

  const teamData = teamRes.data.team;
  const teamMembers = teamRes.data.team.members;

  return (
    <div className="h-full space-y-6">
      {/* Header: Team identity, rank, code, and role-based actions */}
      <TeamHeader teamData={teamData} />

      {/* Team Members List */}
      <MembersList myRole={teamData.myRole} members={teamMembers} />

      {/* Lazy-loaded Team Activity & Stats */}
      <Suspense fallback={<TeamDataSkeleton />}>
        <TeamData />
      </Suspense>
    </div>
  );
};

export default TeamContainer;
