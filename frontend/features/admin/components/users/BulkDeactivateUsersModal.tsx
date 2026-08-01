"use client";

import { GenericBulkActionModal } from "@/features/admin/components/shared/GenericBulkActionModal";
import { bulkDeactivateUsersAction } from "@/features/admin/actions/user.actions";
import { UserX } from "lucide-react";

interface BulkDeactivateUsersModalProps {
  selectedUserIds: string[];
  onSuccessClearSelection?: () => void;
  cancelSelection?: () => void;
}

export function BulkDeactivateUsersModal({
  selectedUserIds,
  onSuccessClearSelection,
  cancelSelection,
}: BulkDeactivateUsersModalProps) {
  const count = selectedUserIds.length;

  return (
    <GenericBulkActionModal
      selectedCount={count}
      triggerText="إلغاء تفعيل المحدد"
      triggerIcon={<UserX className="h-4 w-4" />}
      title={`إلغاء تفعيل ${count} مستخدم`}
      description={`هل أنت متأكد من إلغاء تفعيل ${count} مستخدم محدد؟ تنبيه: لن تكتمل العملية إذا كان أحد المستخدمين قائد فريق (Captain).`}
      confirmText="تأكيد الغاء التفعيل"
      cancelText="إلغاء"
      onConfirm={() => bulkDeactivateUsersAction(selectedUserIds)}
      onSuccess={onSuccessClearSelection}
      onCancel={cancelSelection}
    />
  );
}
