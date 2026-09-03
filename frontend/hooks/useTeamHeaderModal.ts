import { showError, showSuccess } from "@/components/shared/notifications";
import { changeTeamName, deleteTeam, leaveTeam } from "@/features/team/actions";
import { ActionResponse } from "@/shared/types/response";
import { useState } from "react";

type ActiveModal = "rename" | "delete" | "leave" | "create" | "join" | null;

interface Props {
  teamName?: string;
  id?: string;
}

export function useTeamHeaderModal({ teamName, id }: Props) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [newTeamName, setNewTeamName] = useState(teamName);

//   const [isLoading, setIsLoading] = useState(false);

  function openModal(modal: Exclude<ActiveModal, null>) {
    if (modal === "rename") {
      setNewTeamName(teamName);
    }

    setActiveModal(modal);
  }

  function closeModal() {
    setActiveModal(null);
  }

  async function runAction(action: () => Promise<ActionResponse | undefined>) {
    // if (activeModal !== "rename") {
    //   setIsLoading(true);
    // }

    try {
      const result = await action();
      if (result?.error) {
        showError(result.error);
        return false;
      }

      return true;
    } finally {
      //   setIsLoading(false);
    }
  }

  async function handleRename() {
    const success = await runAction(() =>
      changeTeamName(id as string, newTeamName as string),
    );

    if (!success) return false;

    showSuccess("تم تعديل اسم الفريق بنجاح");
    return true;
  }

  const handleDelete = () => runAction(deleteTeam);

  const handleLeave = () => runAction(leaveTeam);

  return {
    openModal,
    closeModal,
    activeModal,
    newTeamName,
    setNewTeamName,
    runAction,
    handleRename,
    handleDelete,
    handleLeave,
    // isLoading,
  };
}
