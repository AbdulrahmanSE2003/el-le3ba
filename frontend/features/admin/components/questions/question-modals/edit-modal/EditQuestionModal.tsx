"use client";

import { useState } from "react";

import { BaseModal } from "@/features/admin/components/shared/BaseModal";
import { AdminQuestion, toCreateQuestionInput } from "@/features/admin/types/question";
import { QuestionForm } from "@/features/admin/components/questions/question-modals/question-form/QuestionForm";
import { updateQuestionAction } from "@/features/admin/actions/questions";
import { useFormFeedBack } from "@/hooks/useFormFeedback";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";

interface EditQuestionModalProps {
  question: AdminQuestion;
}

export function EditQuestionModal({ question }: EditQuestionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateQuestion = updateQuestionAction.bind(null, question._id!);
  const { formAction, isPending } = useFormFeedBack(updateQuestion, setIsOpen);

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="gap-2 cursor-pointer"
      >
        <Pencil className="w-4 h-4 text-amber-500" /> تعديل السؤال
      </DropdownMenuItem>

      <BaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="تعديل السؤال"
        description="قم بتعديل بيانات السؤال ثم اضغط حفظ."
      >
        <QuestionForm
          key={question._id}
          mode="update"
          initialValues={toCreateQuestionInput(question)}
          onSubmit={(data) => formAction(data)}
          isLoading={isPending}
        />
      </BaseModal>
    </>
  );
}
