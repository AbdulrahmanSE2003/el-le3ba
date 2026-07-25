"use client";

import Link from "next/link";
import { Users, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateTeamModal from "@/components/shared/no-team/CreateTeamModal";
import { useState } from "react";
import { createTeam, joinTeam } from "@/features/team/actions";
import { showError, showSuccess } from "@/components/shared/notifications";
import Loading from "@/components/shared/Loading";
import JoinTeamModal from "@/components/shared/no-team/JoinTeamModal";

const EmptyState = () => {
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

  return (
    <>
      <div className="rounded-xl border border-border p-8 text-center">
        <h2 className="text-xl font-semibold">لسه معندكش فريق 👀</h2>
        <p className="mt-2 text-muted-foreground">
          اللعبة أحلى مع الفريق! كوّن فريقك أو انضم لفريق موجود، وابدأ نافس في
          التحديات، اجمع نقاط، ووصل فريقك للفوز.{" "}
        </p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button onClick={() => handleCreateModalChange(true)} asChild size="lg">
          <Link href="#">
            <PlusCircle className="mr-2 size-5" />
            كوّن فريق
          </Link>
        </Button>

        <Button
          onClick={() => handleJoinModalChange(true)}
          asChild
          variant="outline"
          size="lg"
        >
          <Link href="#">
            <Users className="mr-2 size-5" />
            انضم لفريق
          </Link>
        </Button>
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
    </>
  );
};

export default EmptyState;
