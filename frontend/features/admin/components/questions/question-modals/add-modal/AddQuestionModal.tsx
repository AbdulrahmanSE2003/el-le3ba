"use client";

import { ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { BaseModal } from "@/features/admin/components/shared/BaseModal";
import { QuestionForm } from "@/features/admin/components/questions/question-modals/question-form/QuestionForm";
import { createQuestionAction } from "@/features/admin/actions/questions";
import { useFormFeedBack } from "@/hooks/useFormFeedback";

import { Plus } from "lucide-react";

export function AddQuestionModal({trigger} : {trigger?: ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);

  const { formAction, isPending } = useFormFeedBack(
    createQuestionAction,
    setIsOpen,
  );

  return (
    <>

    {trigger ? (
                <div onClick={() => setIsOpen(true)}>{trigger}</div>
              ) : (
                <Button onClick={() => setIsOpen(true)} className="gap-2">
        <Plus className="w-4 h-4" /> إضافة سؤال جديد
      </Button>
              )}
      

      <BaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="إضافة سؤال جديد"
        description="أدخل بيانات السؤال ثم اضغط إضافة."
      >
        <QuestionForm
          mode="create"
          onSubmit={(data) => formAction(data)}
          isLoading={isPending}
        />
      </BaseModal>
    </>
  );
}
