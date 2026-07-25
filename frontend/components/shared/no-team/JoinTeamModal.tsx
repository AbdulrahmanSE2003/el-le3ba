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
  onConfirm?: () => Promise<boolean | void> | boolean | void;
  teamCode: string;
  setTeamCode: (teamCode: string) => void;
}

export default function JoinTeamModal({
  open,
  onOpenChange,
  onConfirm,
  teamCode,
  setTeamCode,
}: AlertModalProps) {
  const [loading, setLoading] = useState(false);

  // Modal create Content
  // Modal join Content
  const content = (
    <div className="py-4 w-full">
      <Input
        placeholder="كود الفريق (مثال: ABC123XYZ)"
        className="text-right rounded-xl w-full"
        value={teamCode}
        onChange={(e) => setTeamCode(e.target.value)}
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
          <AlertDialogTitle>إنضمام لفريق</AlertDialogTitle>

          <AlertDialogDescription>
            أدخل كود الفريق للانضمام
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
            {loading ? "جاري التنفيذ..." : "انضمام"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
