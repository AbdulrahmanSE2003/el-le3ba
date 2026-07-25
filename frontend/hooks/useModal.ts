import { showError, showSuccess } from "@/components/shared/notifications";
import { ActionResponse } from "@/shared/types/response";
import { useState } from "react";

export function useModal(
  action: (teamOrCode: string) => Promise<ActionResponse>,
  successMessage: string,
  errorMessage: string,
) {
  // UI State
  const [openModal, setOpenModal] = useState(false);
  const [teamOrCode, setTeamOrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  // Modal create Change
  const handleModalChange = (isOpen: boolean) => {
    setOpenModal(isOpen);
    if (!isOpen) setTeamOrCode("");
  };

  // create Team action
  async function handleAction() {
    const result = await action(teamOrCode);

    if (result.success) {
      showSuccess(result.message || successMessage);
      setIsLoading(true);
      return true;
    }

    showError(result.error || errorMessage);
  }

  return {
    openModal,
    handleModalChange,
    teamOrCode,
    setTeamOrCode,
    handleAction,
    isLoading,
  };
}
