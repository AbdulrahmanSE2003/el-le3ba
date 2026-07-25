"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { MyAlertModal } from "../MyAlertModal";
import NoTeamActions from "./NoTeamActions";
import NoTeamIcon from "./NoTeamIcon";

import { createTeam, joinTeam } from "@/features/team/actions";

import { showError, showSuccess } from "../notifications";
import Loading from "../Loading";

export default function NoTeam() {
  // UI State
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Modal create Content
  const createContent = (
    <div className="py-4 w-full">
      <Input
        placeholder="ادخل اسم الفريق"
        maxLength={20}
        className="text-right rounded-xl w-full"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
    </div>
  );

  // Modal join Content
  const joinContent = (
    <div className="py-4 w-full">
      <Input
        placeholder="كود الفريق (مثال: ABC123XYZ)"
        className="text-right rounded-xl w-full"
        value={teamCode}
        onChange={(e) => setTeamCode(e.target.value)}
      />
    </div>
  );

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
      router.refresh();
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
      router.refresh();
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
      <MyAlertModal
        title="إنشاء فريق جديد"
        description="اختار اسم لفريقك وابدأ رحلتك مع أصحابك."
        content={createContent}
        open={openCreateModal}
        onOpenChange={handleCreateModalChange}
        onConfirm={handleCreateTeam}
      />

      {/* Join Team Modal */}
      <MyAlertModal
        title="الانضمام إلى فريق"
        description="ادخل كود الفريق للانضمام."
        content={joinContent}
        open={openJoinModal}
        onOpenChange={handleJoinModalChange}
        onConfirm={handleJoinTeam}
      />
    </section>
  );
}
