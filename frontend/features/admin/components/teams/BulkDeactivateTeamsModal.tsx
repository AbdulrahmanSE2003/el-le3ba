"use client";

import { GenericBulkActionModal } from "@/features/admin/components/shared/GenericBulkActionModal";
import { bulkDeactivateTeamsAction } from "@/features/admin/actions/team.actions";
import { UserX } from "lucide-react";

interface BulkDeactivateTeamsModalProps {
  selectedTeamIds: string[];
  onSuccessClearSelection?: () => void;
  cancelSelection?: () => void;
}

export function BulkDeactivateTeamsModal({
  selectedTeamIds,
  onSuccessClearSelection,
  cancelSelection,
}: BulkDeactivateTeamsModalProps) {
  const count = selectedTeamIds.length;

  return (
    <GenericBulkActionModal
      selectedCount={count}
      triggerText="إلغاء تفعيل المحدد"
      triggerIcon={<UserX className="h-4 w-4" />}
      title={`إلغاء تفعيل ${count} فريق`}
      description={`هل أنت متأكد من إلغاء تفعيل ${count} فريق محدد؟ سيتم حذف هذه الفرق من النظام.`}
      confirmText="تأكيد الغاء التفعيل"
      cancelText="إلغاء"
      onConfirm={() => bulkDeactivateTeamsAction(selectedTeamIds)}
      onSuccess={onSuccessClearSelection}
      onCancel={cancelSelection}
    />
  );
}
