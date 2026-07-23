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

  if (!teamRes.success) {
    return <Error />;
  }

  if (!teamRes.data.team) return <NoTeam />;

  const team = teamRes.data.team.team;

  return (
    <div className="h-full space-y-6">
      {/* Header: Team identity, rank, actions */}
      <TeamHeader teamName={team.teamName} />

      {/* Two-column layout: Members + Activity on wider screens */}
      <MembersList />

      <Suspense fallback={<TeamDataSkeleton />}>
        <TeamData />
      </Suspense>
    </div>
  );
};

export default TeamContainer;
