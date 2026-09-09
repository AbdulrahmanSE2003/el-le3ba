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
import { showError, showSuccess } from "@/components/shared/notifications";
import { endSession } from "@/features/admin/actions/sessions";

interface Props {
  sessionId: string;
  teamName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EndSessionAlert({
  sessionId,
  teamName,
  open,
  onOpenChange,
}: Props) {
  const [isPending, setIsPending] = useState(false);

  async function handleConfirm(e: React.MouseEvent) {
    e.preventDefault();
    setIsPending(true);

    const result = await endSession(sessionId);

    if (result.success) {
      showSuccess(result.message || "تم إيقاف المباراة");
      onOpenChange(false);
    } else {
      showError(result.error || "حصل مشكلة أثناء إيقاف المباراة");
    }

    setIsPending(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>إيقاف المباراة؟</AlertDialogTitle>
          <AlertDialogDescription>
            المباراة الخاصة بفريق <strong>{teamName}</strong> هتتوقف فورًا
            وهيتحسب إنهاء غير طبيعي (منسحب). الإجراء ده مينفعش يتراجع فيه.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleConfirm}
            variant="destructive"
          >
            {isPending ? "جاري الإيقاف..." : "إيقاف المباراة"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
