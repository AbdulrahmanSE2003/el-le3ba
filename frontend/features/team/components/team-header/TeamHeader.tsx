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

interface TeamHeaderProps {
  teamData: TeamType;
}

type ActiveModal = "rename" | "delete" | "leave" | null;

export default function TeamHeader({ teamData }: TeamHeaderProps) {
  const { team, myRole, rank } = teamData;

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [newTeamName, setNewTeamName] = useState(team.teamName);

  function openModal(modal: Exclude<ActiveModal, null>) {
    if (modal === "rename") {
      setNewTeamName(team.teamName);
    }

    setActiveModal(modal);
  }

  function closeModal(open: boolean, modal: Exclude<ActiveModal, null>) {
    setActiveModal(open ? modal : null);
  }

  async function runAction(action: () => Promise<unknown>) {
    const result = await action();

    if (result?.error) {
      showError(result.error);
      return false;
    }

    return true;
  }

  async function handleRename() {
    const success = await runAction(() =>
      changeTeamName(team._id, newTeamName),
    );

    if (!success) return false;

    showSuccess("تم تعديل اسم الفريق بنجاح");
    return true;
  }

  const handleDelete = () => runAction(deleteTeam);

  const handleLeave = () => runAction(leaveTeam);

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
        onOpenChange={(open) => closeModal(open, "rename")}
        onConfirm={handleRename}
        content={
          <div className="py-4 w-full">
            <Input
              value={newTeamName}
              maxLength={20}
              className="rounded-xl text-right"
              placeholder="اسم الفريق الجديد"
              onChange={(e) => setNewTeamName(e.target.value)}
            />
          </div>
        }
      />

      <MyAlertModal
        title="تنبيه حذف الفريق"
        confirmText="حذف"
        open={activeModal === "delete"}
        onOpenChange={(open) => closeModal(open, "delete")}
        onConfirm={handleDelete}
        content={
          <p className="py-4 text-right text-sm text-muted-foreground">
            هل أنت متأكد من حذف الفريق بالكامل؟ سيتم حذف جميع الأعضاء وبيانات
            الفريق، ولا يمكن التراجع عن هذا الإجراء.
          </p>
        }
      />

      <MyAlertModal
        title="مغادرة الفريق"
        confirmText="مغادرة"
        open={activeModal === "leave"}
        onOpenChange={(open) => closeModal(open, "leave")}
        onConfirm={handleLeave}
        content={
          <p className="py-4 text-right text-sm text-muted-foreground">
            هل أنت متأكد من مغادرة الفريق؟ ستحتاج للانضمام إلى فريق آخر حتى
            تتمكن من المشاركة مرة أخرى.
          </p>
        }
      />
    </StyleContainer>
  );
}
