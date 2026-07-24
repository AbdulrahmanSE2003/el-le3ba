"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/shared/AlertModal";
import { getSocket } from "@/features/match/lib/socket";

interface AbandonButtonProps {
  teamId: string | null;
  sessionId: string | null;
  userId: string;
}

const AbandonButton = ({ teamId, sessionId, userId }: AbandonButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleAbandon = () => {
    if (!teamId || !sessionId) return;
    getSocket().emit("abandon-game", { teamId, sessionId, userId });
    setShowModal(false);
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setShowModal(true)}
        className="absolute top-4 left-4 cursor-pointer px-5 py-5 text-md"
      >
        انسحب من الماتش
      </Button>
      <AlertModal
        open={showModal}
        onOpenChange={setShowModal}
        title="الانسحاب من الماتش"
        description="سيتم إنهاء الجلسة ولن تتمكن من استكمال اللعبة. هل أنت متأكد؟"
        confirmText="انسحاب"
        cancelText="إلغاء"
        onConfirm={handleAbandon}
      />
    </>
  );
};

export default AbandonButton;
