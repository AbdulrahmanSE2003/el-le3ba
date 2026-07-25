"use client";

import { useState } from "react";

import NoTeamActions from "./NoTeamActions";
import NoTeamIcon from "./NoTeamIcon";
import CreateTeamModal from "./CreateTeamModal";

import { createTeam, joinTeam } from "@/features/team/actions";

import { showError, showSuccess } from "../notifications";
import Loading from "../Loading";
import JoinTeamModal from "./JoinTeamModal";

export default function NoTeam() {
  // UI State
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  // Handlers
  // Modal create Change
  const handleCreateModalChange = (isOpen: boolean) => {
    setOpenCreateModal(isOpen);
    if (!isOpen) setTeamName("");
  };

  // Modal join Change
  const handleJoinModalChange = (isOpen: boolean) => {
    setOpenJoinModal(isOpen);
    if (!isOpen) setTeamCode("");
  };

  // create Team action
  async function handleCreateTeam() {
    const result = await createTeam(teamName);

    if (result.success) {
      showSuccess(result.message || "تم إنشاء الفريق بنجاح");
      setIsLoading(true);
      return true;
    }

    showError(result.error || "فشل إنشاء الفريق. حاول مرة اخرى لاحقا");
  }

  // join Team action
  async function handleJoinTeam() {
    const result = await joinTeam(teamCode);

    if (result.success) {
      showSuccess(result.message || "تم الانضمام للفريق بنجاح");
      setIsLoading(true);
      return true;
    }

    showError(result.error || "فشل الانضمام للفريق");
  }

  // Loading State
  if (isLoading) {
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
          onOpenCreate={() => setOpenCreateModal(true)}
          onOpenJoin={() => setOpenJoinModal(true)}
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
