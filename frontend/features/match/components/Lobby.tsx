"use client";
import MemberCard from "@/features/match/components/memberCard";
import StartMatch from "@/features/match/components/StartMatch";
import RulesSection from "./RulesSection";
import { Event, Member, Team } from "../types";
import { useUserStore } from "@/store/userStore";
const Lobby = ({
  event,
  team,
}: {
  event: Event;
  team: { team: Team; members: Member[] };
}) => {
  const { user } = useUserStore();

  const isCaptain = user?._id.toString() === team.team.teamLeader.toString();

  console.log(`UserId: ${user?._id.toString()}`);
  console.log(`captainId: ${team.team.teamLeader.toString()}`);

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
      {isCaptain ? (
        <StartMatch />
      ) : (
        <div
          className={`w-full bg-accent/15 rounded-lg border-2 border-dashed border-accent/50 p-3 flex items-center justify-center`}
        >
          <p>قول للكابتن يبدأ بسرعة 😶</p>
        </div>
      )}

      {/* Game Rules */}
      <RulesSection />
    </div>
  );
};

export default Lobby;
