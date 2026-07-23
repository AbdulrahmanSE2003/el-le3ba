"use client";

import { memo } from "react";
import MemberCard from "./MemberCard";
import StartMatch from "./StartMatch";
import WaitingForCaptain from "./WaitingForCaptain";
import RulesSection from "./RulesSection";
import type { Team } from "@/shared/types/team";
import { useUserStore } from "@/store/userStore";
import { useLobbyStore } from "@/features/match/store/lobbyStore";
import { useLobbySocket } from "@/features/match/hooks/useLobbySocket";

interface LobbyProps {
  team: Team;
}

const TeamName = memo(function TeamName({ name }: { name: string }) {
  return (
    <h3 className="w-full text-3xl font-semibold text-foreground relative">
      {name}
      <div className="absolute -bottom-1 bg-primary w-1/4 h-0.75 rounded-full" />
    </h3>
  );
});

const MembersGrid = memo(function MembersGrid({
  members,
}: {
  members: import("@/features/match/lib/socket").PresenceMember[];
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {members.map((member) => (
        <MemberCard key={member.userId} member={member} />
      ))}
    </div>
  );
});

const Lobby = ({ team }: LobbyProps) => {
  const { user, isHydrated } = useUserStore();
  const isCaptain = user?._id === team.teamLeader;

  const { startGame } = useLobbySocket({
    teamId: team._id,
    userId: user?._id ?? "",
    isCaptain,
  });

  const { members, error } = useLobbyStore();

  if (!isHydrated || !user) return null;
  if (error) return <div className="text-destructive text-sm">{error}</div>;

  return (
    <div className="space-y-6">
      <TeamName name={team.teamName} />
      <MembersGrid members={members} />

      {isCaptain ? (
        <StartMatch onClick={startGame} />
      ) : (
        <WaitingForCaptain />
      )}

      <RulesSection />
    </div>
  );
};

export default Lobby;
