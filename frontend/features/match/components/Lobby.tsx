import MemberCard from "@/features/match/components/memberCard";
import StartMatch from "@/features/match/components/StartMatch";
import RulesSection from "./RulesSection";
import { Event, Member, Team } from "../types";

const Lobby = ({
  event,
  team,
}: {
  event: Event;
  team: { team: Team; members: Member[] };
}) => {
  // We need to get user role here from zustand store
  return (
    <div className="space-y-6">
      {/* Team Name */}
      <h3 className="w-full text-3xl font-semibold text-foreground relative">
        {team.team.teamName}
        <div className="absolute -bottom-1 bg-primary w-1/4 h-0.75 rounded-full" />
      </h3>

      {/* Team Members */}
      <div className="grid grid-cols-3 gap-3">
        {team.members.map((member) => (
          <MemberCard key={member._id} member={member} />
        ))}
      </div>

      {/* Start Game */}
      {<StartMatch />}

      {/* Game Rules */}
      <RulesSection />
    </div>
  );
};

export default Lobby;
