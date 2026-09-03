"use client";

import { Input } from "@/components/ui/input";

import StyleContainer from "@/components/shared/StyleContainer";
import TeamIdentity from "./TeamIdentity";
import TeamRank from "./TeamRank";
import TeamActions from "./TeamActions";
import { MyAlertModal } from "@/components/shared/MyAlertModal";

import { TeamType } from "../../types";

import { useTeamHeaderModal } from "@/hooks/useTeamHeaderModal";
// import Loading from "@/components/shared/Loading";

interface TeamHeaderProps {
  teamData: TeamType;
}

export default function TeamHeader({ teamData }: TeamHeaderProps) {
  const { team, myRole, rank } = teamData;

  const {
    openModal,
    activeModal,
    newTeamName,
    setNewTeamName,
    closeModal,
    handleRename,
    handleLeave,
    handleDelete,
    // isLoading
  } = useTeamHeaderModal({
    teamName: team.teamName,
    id: team._id,
  });

  // Rename Modal Content
  const renameContent = (
    <div className="py-4 w-full">
      <Input
        value={newTeamName}
        maxLength={20}
        className="rounded-xl text-right"
        placeholder="اسم الفريق الجديد"
        onChange={(e) => setNewTeamName(e.target.value)}
      />
    </div>
  );

  // Delete Modal Content
  const removeContent = (
    <p className="py-4 text-right text-sm text-muted-foreground">
      هل أنت متأكد من حذف الفريق بالكامل؟ سيتم حذف جميع الأعضاء وبيانات الفريق،
      ولا يمكن التراجع عن هذا الإجراء.
    </p>
  );

  // Leave Modal Content
  const leaveContent = (
    <p className="py-4 text-right text-sm text-muted-foreground">
      هل أنت متأكد من مغادرة الفريق؟ ستحتاج للانضمام إلى فريق آخر حتى تتمكن من
      المشاركة مرة أخرى.
    </p>
  );

  // if (isLoading) {
  //   return <Loading/>
  // }

  return (
    <StyleContainer className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 md:p-8">
      <TeamIdentity
        teamName={team.teamName}
        teamCode={team.teamCode}
        createdAt={team.createdAt}
        role={myRole}
      />

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-border">
        <TeamRank rank={rank} />

        <TeamActions
          myRole={myRole}
          onRenameClick={() => openModal("rename")}
          onDeleteClick={() => openModal("delete")}
          onLeaveClick={() => openModal("leave")}
        />
      </div>

      <MyAlertModal
        title="تعديل اسم الفريق"
        confirmText="تعديل"
        open={activeModal === "rename"}
        onOpenChange={closeModal}
        onConfirm={handleRename}
        content={renameContent}
      />

      <MyAlertModal
        title="تنبيه حذف الفريق"
        confirmText="حذف"
        open={activeModal === "delete"}
        onOpenChange={closeModal}
        onConfirm={handleDelete}
        content={removeContent}
      />

      <MyAlertModal
        title="مغادرة الفريق"
        confirmText="مغادرة"
        open={activeModal === "leave"}
        onOpenChange={closeModal}
        onConfirm={handleLeave}
        content={leaveContent}
      />
    </StyleContainer>
  );
}
