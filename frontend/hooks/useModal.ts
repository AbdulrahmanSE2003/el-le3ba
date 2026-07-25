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
  const [data, setData] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  // Handlers
  // Modal create Change
  const handleModalChange = (isOpen: boolean) => {
    setOpenModal(isOpen);
    if (!isOpen) setData("");
  };

  // create or join Team action
  async function handleAction() {
    // setIsLoading(true);
    try {
      const result = await action(data);

      if (result.success) {
        showSuccess(result.message || successMessage);
        return true;
      }

      showError(result.error || errorMessage);
    } finally {
      // setIsLoading(false);
    }
  }

  return {
    openModal,
    handleModalChange,
    data,
    setData,
    handleAction,
    // isLoading,
  };
}
