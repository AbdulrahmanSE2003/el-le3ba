"use client";
import MemberCard from "@/features/match/components/memberCard";
import StartMatch from "@/features/match/components/StartMatch";
import RulesSection from "./RulesSection";
import { Team } from "../types";
import { useUserStore } from "@/store/userStore";
import { useLobbyStore } from "@/store/lobbyStore";
import { useLobbySocket } from "@/hooks/useLobbySocket";

const Lobby = ({ team }: { team: { team: Team } }) => {
  const { user } = useUserStore();

  const { startGame } = useLobbySocket({
    teamId: team.team._id,
    userId: user?._id || "",
  });
  const { members, error } = useLobbyStore();

  if (error) return <div className="text-destructive text-sm">{error}</div>;

  const isCaptain = user?._id === team.team.teamLeader;

  return (
    <div className="space-y-6">
      {/* Team Name */}
      <h3 className="w-full text-3xl font-semibold text-foreground relative">
        {team.team.teamName}
        <div className="absolute -bottom-1 bg-primary w-1/4 h-0.75 rounded-full" />
      </h3>

      {/* Team Members */}
      <div className="grid grid-cols-3 gap-3">
        {members.map((member) => (
          <MemberCard key={member.userId} member={member} />
        ))}
      </div>

      {/* Start Game */}
      {!isCaptain ? (
        <div
          className={`w-full bg-accent/15 rounded-lg border-2 border-dashed border-accent/50 p-3 flex items-center justify-center`}
        >
          <p>قول للكابتن يبدأ بسرعة 😶</p>
        </div>
      ) : isCaptain ? (
        <StartMatch onClick={startGame} />
      ) : (
        <div
          className={`w-full bg-neutral-500/15 rounded-lg border-2 border-dashed border-neutral-500/50 p-3 py-4 flex items-center justify-center`}
        >
          <p>واحدة واحدة ، لسا قدامنا وقت طويييل</p>
        </div>
      )}

      {/* Game Rules */}
      <RulesSection />
    </div>
  );
};

export default Lobby;
