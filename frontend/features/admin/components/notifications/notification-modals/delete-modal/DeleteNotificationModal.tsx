"use client";

import { useState } from "react";

import { BaseModal } from "@/features/admin/components/shared/BaseModal";
import { deleteNotificationAction } from "@/features/admin/actions/notifications";
import { NotificationCampaign } from "@/features/admin/types/notification";
import Warning from "./Warning";
import ActionBtn from "./ActionBtn";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Trash2 } from "lucide-react";

import { useFormFeedBack } from "@/hooks/useFormFeedback";

interface DeleteNotificationModalProps {
  notification: NotificationCampaign;
}

export function DeleteNotificationModal({
  notification,
}: DeleteNotificationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const action = deleteNotificationAction.bind(null, notification._id);
  const { formAction, isPending } = useFormFeedBack(action, setIsOpen);

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="gap-2 cursor-pointer text-destructive dark:text-destructive hover:dark:text-accent-foreground"
      >
        <Trash2 className="w-4 h-4" /> حذف السجل
      </DropdownMenuItem>

      <BaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="تأكيد حذف الإشعار"
        description="سيتم حذف سجل هذا الإشعار بشكل نهائي من النظام."
      >
        <form
          action={formAction}
          className="space-y-4 py-2 dir-rtl text-right font-body"
        >
          <Warning title={notification.title} />

          <div className="flex items-center justify-end gap-2 pt-2">
            <ActionBtn
              pending={isPending}
              text="إلغاء"
              variant="outline"
              onClick={() => setIsOpen(false)}
            />

            <ActionBtn
              pending={isPending}
              text="حذف الإشعار"
              variant="destructive"
              type="submit"
            />
          </div>
        </form>
      </BaseModal>
    </>
  );
}
