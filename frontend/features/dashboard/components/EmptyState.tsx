"use client";

import Link from "next/link";
import { Users, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateTeamModal from "@/components/shared/no-team/CreateTeamModal";
import { createTeam, joinTeam } from "@/features/team/actions";
import Loading from "@/components/shared/Loading";
import JoinTeamModal from "@/components/shared/no-team/JoinTeamModal";
import { useModal } from "@/hooks/useModal";

const EmptyState = () => {
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
