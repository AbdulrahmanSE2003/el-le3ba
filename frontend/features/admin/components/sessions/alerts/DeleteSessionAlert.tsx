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
import { deleteSession } from "@/features/admin/actions/sessions";

interface Props {
  sessionId: string;
  teamName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteSessionAlert({
  sessionId,
  teamName,
  open,
  onOpenChange,
}: Props) {
  const [isPending, setIsPending] = useState(false);

  async function handleConfirm(e: React.MouseEvent) {
    e.preventDefault();
    setIsPending(true);

    const result = await deleteSession(sessionId);

    if (result.success) {
      showSuccess(result.message || "تم حذف المباراة");
      onOpenChange(false);
    } else {
      showError(result.error || "حصل مشكلة أثناء حذف المباراة");
    }

    setIsPending(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>حذف سجل المباراة نهائيًا؟</AlertDialogTitle>
          <AlertDialogDescription>
            هيتم حذف مباراة فريق <strong>{teamName}</strong> نهائيًا من
            السجلات، ولن تظهر في لوحة الصدارة أو الإحصائيات بعد كده. الإجراء ده
            مينفعش يتراجع فيه.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleConfirm}
            variant="destructive"
          >
            {isPending ? "جاري الحذف..." : "حذف نهائي"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
