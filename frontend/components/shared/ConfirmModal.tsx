"use client";

import { Button } from "@/components/ui/button";
import GenericModal from "./GenericModal";
import { useEffect, useState } from "react";

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  loading?: boolean;
}

const COUNTDOWN_SECONDS = 5;

const ConfirmModal = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  onConfirm,
  loading = false,
}: ConfirmModalProps) => {
  const [count, setCount] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (!open) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(COUNTDOWN_SECONDS);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  return (
    <GenericModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
    >
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={loading}
        >
          {cancelText}
        </Button>

        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={loading || count > 0}
        >
          {loading
            ? "جاري التنفيذ..."
            : count > 0
              ? `تأكيد (${count})`
              : confirmText}
        </Button>
      </div>
    </GenericModal>
  );
};

export default ConfirmModal;
