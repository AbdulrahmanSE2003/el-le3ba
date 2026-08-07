"use client";

import { useTableSelection } from "@/features/admin/components/shared/TableCheckbox";
import { BulkDeleteQuestionsModal } from "@/features/admin/components/questions/question-modals/bulk-delete-modal/BulkDeleteQuestionsModal";

export function QuestionsSelectionBar() {
  const { selectedIds, clearSelection } = useTableSelection();

  if (selectedIds.length === 0) return null;

  return (
    <div className="bg-white dark:bg-card p-3 rounded-lg border border-border">
      <BulkDeleteQuestionsModal
        selectedQuestionIds={selectedIds}
        onSuccessClearSelection={clearSelection}
        cancelSelection={clearSelection}
      />
    </div>
  );
}
