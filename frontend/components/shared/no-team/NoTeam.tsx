"use client";

import NoTeamActions from "./NoTeamActions";
import NoTeamIcon from "./NoTeamIcon";
import CreateTeamModal from "./CreateTeamModal";

import { createTeam, joinTeam } from "@/features/team/actions";

import Loading from "../Loading";
import JoinTeamModal from "./JoinTeamModal";
import { useModal } from "@/hooks/useModal";

export default function NoTeam() {
  const {
    handleModalChange: handleJoinModalChange,
    openModal: openJoinModal,
    isLoading: isJoinLoading,
    teamOrCode: teamCode,
    setTeamOrCode: setTeamCode,
    handleAction: handleJoinTeam,
  } = useModal(joinTeam, "تم الانضمام للفريق بنجاح", "فشل الانضمام للفريق");

  const {
    handleModalChange: handleCreateModalChange,
    openModal: openCreateModal,
    isLoading: isCreateLoading,
    teamOrCode: teamName,
    setTeamOrCode: setTeamName,
    handleAction: handleCreateTeam,
  } = useModal(createTeam, "تم إنشاء الفريق بنجاح", "فشل إنشاء الفريق");

  // Loading State
  if (isJoinLoading || isCreateLoading) {
    return <Loading />;
  }

  // No Team UI
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="p-8 text-center shadow-lg border border-border rounded-2xl max-w-md w-full bg-card">
        <NoTeamIcon />

        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          لسا معندكش فريق 🙁
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          أنشئ فريقًا جديدًا أو انضم لفريق موجود عبر الكود لتشارك في الإيفنت
          الحالي.
        </p>

        <NoTeamActions
          onOpenCreate={() => handleCreateModalChange(true)}
          onOpenJoin={() => handleJoinModalChange(true)}
        />
      </div>

      {/* Create Team Modal */}
      <CreateTeamModal
        open={openCreateModal}
        onOpenChange={handleCreateModalChange}
        onConfirm={handleCreateTeam}
        teamName={teamName}
        setTeamName={setTeamName}
      />

      {/* Join Team Modal */}
      <JoinTeamModal
        open={openJoinModal}
        onOpenChange={handleJoinModalChange}
        onConfirm={handleJoinTeam}
        teamCode={teamCode}
        setTeamCode={setTeamCode}
      />
    </section>
  );
}
