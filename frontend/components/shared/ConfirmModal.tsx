"use client";

import { Button } from "@/components/ui/button";
import GenericModal from "./GenericModal";

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

        <Button variant="destructive" onClick={onConfirm} disabled={loading}>
          {loading ? "جاري التنفيذ..." : confirmText}
        </Button>
      </div>
    </GenericModal>
  );
};

export default ConfirmModal;
