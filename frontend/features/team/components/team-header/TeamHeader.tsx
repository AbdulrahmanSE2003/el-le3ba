"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

import StyleContainer from "@/components/shared/StyleContainer";
import TeamIdentity from "./TeamIdentity";
import TeamRank from "./TeamRank";
import TeamActions from "./TeamActions";

import { MyAlertModal } from "@/components/shared/MyAlertModal";

import { TeamType } from "../../types";

import { changeTeamName, deleteTeam, leaveTeam } from "../../actions";

import { showError, showSuccess } from "@/components/shared/notifications";

import { useRouter } from "next/navigation";
import Loading from "@/components/shared/Loading";

interface TeamHeaderProps {
  teamData: TeamType;
}

export default function TeamHeader({ teamData }: TeamHeaderProps) {
  const { team, myRole, rank } = teamData;

  // Modal visibility states
  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState(team.teamName);

  const [isLoading, setIsLoading] = useState(false);

  // Render input inside rename modal
  const renameContent = (
    <div className="py-4 w-full">
      <Input
        placeholder="اسم الفريق الجديد"
        maxLength={20}
        className="text-right rounded-xl"
        value={newTeamName}
        onChange={(e) => setNewTeamName(e.target.value)}
      />
    </div>
  );

  // Modal warning descriptions
  const removeContent = (
    <div className="py-4 text-right text-sm text-muted-foreground">
      هل أنت متأكد من حذف الفريق بالكامل؟ هذا الإجراء سيقوم بإزالة جميع الأعضاء
      ولن تتمكن من التراجع عن هذه الخطوة.
    </div>
  );

  // Modal leave Content
  const leaveContent = (
    <div className="py-4 text-right text-sm text-muted-foreground">
      هل أنت متأكد من مغادرة الفريق؟ لن تتمكن من المشاركة في إيفنتات الفريق حتى
      تنضم لفريق آخر.
    </div>
  );

  // Open rename modal and reset the team name on close
  function handleOpenRenameModal(open: boolean) {
    setOpenRenameModal(open);
    setNewTeamName(team.teamName);
  }

  // delete Team action
  async function handleDeleteTeam() {
    setIsLoading(true);

    const result = await deleteTeam();

    setIsLoading(false);

    if (result?.error) {
      showError(result.error);
    }
  }

  // leave Team action
  async function handleLeaveTeam() {
    setIsLoading(true);

    const result = await leaveTeam();

    setIsLoading(false);

    if (result?.error) {
      showError(result.error);
    }
  }

  // rename Team action
  async function handleRenameTeam() {
    const result = await changeTeamName(team._id, newTeamName);

    if (result?.success) {
      showSuccess(result.message || "تم تعديل اسم الفريق بنجاح");
      return true;
    } else if (result?.error) {
      showError(result.error);
    }
  }

  // Show a loading component until leaving the team
  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyleContainer className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 md:p-8">
      {/* Team Identity (Name, Code Badge, Created Date, User Role) */}
      <TeamIdentity
        teamName={team.teamName}
        teamCode={team.teamCode}
        createdAt={team.createdAt}
        role={myRole}
      />

      {/* Rank Standing / Role-based Actions */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-border">
        <TeamRank rank={rank} />

        <TeamActions
          myRole={myRole}
          onRenameClick={() => handleOpenRenameModal(true)}
          onDeleteClick={() => setOpenDeleteModal(true)}
          onLeaveClick={() => setOpenLeaveModal(true)}
        />
      </div>

      {/* Rename Team Dialog */}
      <MyAlertModal
        title="تعديل اسم الفريق"
        content={renameContent}
        open={openRenameModal}
        onOpenChange={handleOpenRenameModal}
        onConfirm={handleRenameTeam}
      />

      {/* Delete Team Dialog */}
      <MyAlertModal
        title="تنبيه حذف الفريق"
        content={removeContent}
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        onConfirm={handleDeleteTeam}
      />

      {/* Leave Team Dialog */}
      <MyAlertModal
        title="مغادرة الفريق"
        content={leaveContent}
        confirmText="مغادرة"
        open={openLeaveModal}
        onOpenChange={setOpenLeaveModal}
        onConfirm={handleLeaveTeam}
      />
    </StyleContainer>
  );
}
