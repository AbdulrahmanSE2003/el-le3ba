"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface CreateTeamModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => Promise<boolean | void> | boolean | void;
  teamName: string;
  setTeamName: (teamName: string) => void;
}

export default function CreateTeamModal({
  open,
  onOpenChange,
  onConfirm,
  teamName,
  setTeamName,
}: CreateTeamModalProps) {
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
          <AlertDialogCancel disabled={loading}>إلغاء</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={handleConfirm}
            variant="default"
          >
            {loading ? "جاري التنفيذ..." : "إنشاء"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
