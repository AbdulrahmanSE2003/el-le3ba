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
import { Input } from "@/components/ui/input";

interface AlertModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  trigger?: ReactNode;

  confirmText?: string | ReactNode;
  cancelText?: string | ReactNode;

  variant?: "default" | "secondary" | "outline" | "destructive";

  onConfirm?: () => Promise<boolean | void> | boolean | void;

  teamName: string;
  setTeamName: (teamName: string) => void;
}

export default function CreateTeamModal({
  open,
  onOpenChange,
  trigger,
  confirmText = "إنشاء",
  cancelText = "إلغاء",
  onConfirm,
  variant,
  teamName,
  setTeamName,
}: AlertModalProps) {
  const [loading, setLoading] = useState(false);

  // Modal create Content
  const content = (
    <div className="py-4 w-full">
      <Input
        placeholder="ادخل اسم الفريق"
        maxLength={20}
        className="text-right rounded-xl w-full"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
    </div>
  );

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
          <AlertDialogTitle>إنشاء فريق جديد</AlertDialogTitle>

          <AlertDialogDescription>
            اختار اسم لفريقك وابدأ رحلتك مع أصحابك.
          </AlertDialogDescription>

          {/* Content if exists */}
          {content}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={handleConfirm}
            variant={variant || "default"}
          >
            {loading ? "جاري التنفيذ..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
