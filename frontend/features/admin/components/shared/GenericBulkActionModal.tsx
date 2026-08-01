"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MyAlertModal } from "@/components/shared/MyAlertModal";
import { Button } from "@/components/ui/button";

interface GenericBulkActionModalProps {
  selectedCount: number;
  triggerText?: string;
  triggerIcon?: React.ReactNode;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<{ success: boolean; error?: string }>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function GenericBulkActionModal({
  selectedCount,
  triggerText = "إلغاء تفعيل المحدد",
  triggerIcon,
  title,
  description,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  onConfirm,
  onSuccess,
  onCancel,
}: GenericBulkActionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (selectedCount === 0) return null;

  const handleAction = async () => {
    const res = await onConfirm();

    if (res.success) {
      toast.success("تم تنفيذ العملية بنجاح!");
      onSuccess?.();
      router.refresh();
      return true;
    } else {
      toast.error(res.error || "فشل تنفيذ العملية");
      return false;
    }
  };

  const handleClearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCancel?.();
  };

  return (
    <div className="flex items-center gap-2">
      <MyAlertModal
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
          >
            {triggerIcon}
            <span>
              {triggerText} ({selectedCount})
            </span>
          </Button>
        }
        title={title}
        description={description}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={handleAction}
      />

      <Button
        size="sm"
        variant="outline"
        onClick={handleClearSelection}
        className="border-primary/30 hover:bg-primary/10 text-primary"
      >
        إلغاء التحديد
      </Button>
    </div>
  );
}
