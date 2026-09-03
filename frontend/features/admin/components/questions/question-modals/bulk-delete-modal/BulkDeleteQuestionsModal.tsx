"use client";

import { GenericBulkActionModal } from "@/features/admin/components/shared/GenericBulkActionModal";
import { bulkDeleteQuestionsAction } from "@/features/admin/actions/questions";
import { Trash2 } from "lucide-react";

interface BulkDeleteQuestionsModalProps {
  selectedQuestionIds: string[];
  onSuccessClearSelection?: () => void;
  cancelSelection?: () => void;
}

export function BulkDeleteQuestionsModal({
  selectedQuestionIds,
  onSuccessClearSelection,
  cancelSelection,
}: BulkDeleteQuestionsModalProps) {
  const count = selectedQuestionIds.length;

  return (
    <GenericBulkActionModal
      selectedCount={count}
      triggerText="حذف الأسئلة المحددة"
      triggerIcon={<Trash2 className="h-4 w-4" />}
      title={`حذف ${count} سؤال نهائيًا`}
      description={`هل أنت متأكد من حذف ${count} سؤال محدد؟ لن تتمكن من استعادة هذه الأسئلة بعد الحذف.`}
      confirmText="حذف نهائي"
      cancelText="إلغاء"
      onConfirm={() => bulkDeleteQuestionsAction(selectedQuestionIds)}
      onSuccess={onSuccessClearSelection}
      onCancel={cancelSelection}
    />
  );
}
