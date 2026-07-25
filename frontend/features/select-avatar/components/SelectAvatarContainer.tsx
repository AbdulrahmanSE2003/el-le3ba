"use client";

import Avatars from "@/features/select-avatar/components/Avatars";
import { useAvatar } from "@/hooks/useAvatar";
import { useActionState, useEffect } from "react";
import { selectAvatar } from "../action";
import { showError } from "@/components/shared/notifications";

interface Props {
  avatar: string | null;
}

export default function SelectAvatarContainer() {
  const { selectedAvatar, handleSelectAvatar } = useAvatar("");

  const [state, formAction, isPending] = useActionState(selectAvatar, null);

  useEffect(() => {
    if (state?.success === false) {
      showError(state?.error || "لازم تختار صورتك");
    }
  }, [state]);

  return (
    <form action={() => formAction(selectedAvatar)}>
      <div className="mb-8">
        <Avatars
          selectedAvatar={selectedAvatar}
          handleSelectAvatar={handleSelectAvatar}
        />
      </div>

      <div>
        <button
          disabled={isPending}
          className="w-full bg-pink-600 flex justify-center text-white py-2 rounded-lg text-xl duration-300 shadow cursor-pointer hover:bg-pink-500 disabled:bg-muted-foreground disabled:cursor-not-allowed"
        >
          Select
        </button>
      </div>
    </form>
  );
}
