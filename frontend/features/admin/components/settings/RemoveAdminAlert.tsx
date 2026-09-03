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
import { removeAdmin } from "@/features/admin/actions/settings";

interface Props {
  adminId: string;
  adminName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RemoveAdminAlert({
  adminId,
  adminName,
  open,
  onOpenChange,
}: Props) {
  const [isPending, setIsPending] = useState(false);

  async function handleConfirm(e: React.MouseEvent) {
    e.preventDefault();
    setIsPending(true);

    const result = await removeAdmin(adminId);

    if (result.success) {
      showSuccess(result.message || "تم إزالة الصلاحيات");
      onOpenChange(false);
    } else {
      showError(result.error || "حصل مشكلة أثناء الإزالة");
    }

    setIsPending(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>إزالة صلاحيات الأدمن؟</AlertDialogTitle>
          <AlertDialogDescription>
            <strong>{adminName}</strong> هيفقد صلاحيات الوصول للوحة الإدارة
            فورًا، وهيرجع حساب لاعب عادي.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleConfirm}
            variant="destructive"
          >
            {isPending ? "جاري الإزالة..." : "إزالة الصلاحيات"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
