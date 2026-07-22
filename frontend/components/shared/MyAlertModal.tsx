"use client";

import { ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  trigger?: ReactNode;

  title?: string;
  description?: ReactNode;
  content?: ReactNode;

  confirmText?: string | ReactNode;
  cancelText?: string | ReactNode;

  onConfirm?: () => Promise<boolean | void> | boolean | void;
}

export function MyAlertModal({
  open,
  onOpenChange,
  trigger,

  title = "متأكد إنك عايز تعمل كدا؟",
  description = "تنبيه: لو الأمر دا تم مش هينفع الرجوع فيه نهائيا.",
  content,

  confirmText = "إكمال",
  cancelText = "إلغاء",

  onConfirm,
}: AlertModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await onConfirm?.();
      if (result === true) {
        onOpenChange?.(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          <AlertDialogDescription>{description}</AlertDialogDescription>

          {/* Content if exists */}
          {content}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={handleConfirm}
            variant={"destructive"}
          >
            {loading ? "جاري التنفيذ..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
