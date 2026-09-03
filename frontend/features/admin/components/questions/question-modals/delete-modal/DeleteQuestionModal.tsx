"use client";

import { useState } from "react";

import { BaseModal } from "@/features/admin/components/shared/BaseModal";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Trash2 } from "lucide-react";

import { useFormFeedBack } from "@/hooks/useFormFeedback";

import { deleteQuestionAction } from "@/features/admin/actions/questions";

import { AdminQuestion } from "@/features/admin/types/question";
import Warning from "../../../shared/Warning";
import ActionBtn from "../../../shared/ActionBtn";

interface DeleteQuestionModalProps {
  question: AdminQuestion;
}

export function DeleteQuestionModal({ question }: DeleteQuestionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const action = deleteQuestionAction.bind(null, question._id);
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
        title="تأكيد حذف السؤال"
        description="سيتم حذف سجل هذا السؤال بشكل نهائي من النظام."
      >
        <form
          action={formAction}
          className="space-y-4 py-2 dir-rtl text-right font-body"
        >
          <Warning title={question.question} label="السؤال" />

          <div className="flex items-center justify-end gap-2 pt-2">
            <ActionBtn
              pending={isPending}
              text="إلغاء"
              variant="outline"
              onClick={() => setIsOpen(false)}
              type="button"
            />

            <ActionBtn
              pending={isPending}
              text="حذف السؤال"
              variant="destructive"
              type="submit"
            />
          </div>
        </form>
      </BaseModal>
    </>
  );
}
