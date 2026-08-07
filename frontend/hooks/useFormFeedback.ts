import { showSuccess, showError } from "@/components/shared/notifications";
import { useActionState, useEffect } from "react";

interface ActionState {
  error?: string | null;
  success?: boolean;
  message?: string;
}

export function useFormFeedBack<TData>(
  action: (prevState: ActionState, data: TData) => Promise<ActionState>,
  handlePanelChange?: (isClose: boolean) => void,
) {
  const [state, formAction, isPending] = useActionState(action, {
    error: null,
    success: false,
  });

  // Handle form feedback
  useEffect(() => {
    // If there is an error, show the error message and close the panel
    if (state?.error) {
      showError(state.error);
      handlePanelChange?.(true);
    }

    // If there is a success message, show the success message and close the panel
    else if (state?.success) {
      showSuccess(state?.message || "Updated successfully!");
      handlePanelChange?.(false);
    }
  }, [state]);

  return { formAction, state, isPending };
}
