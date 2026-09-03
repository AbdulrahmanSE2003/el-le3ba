"use client";

import { useState } from "react";

import { BaseModal } from "@/features/admin/components/shared/BaseModal";
import Title from "@/features/admin/components/shared/Title";
import Message from "@/features/admin/components/shared/Message";
import CloseBtn from "@/features/admin/components/shared/CloseBtn";
import DetailsCard from "@/features/admin/components/shared/DetailsCard";

import { formatCreatedAt } from "@/lib/utils";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Eye, Calendar, User, Users, Tag, Clock } from "lucide-react";
import { AdminQuestion } from "@/features/admin/types/question";

interface ViewQuestionModalProps {
  question: AdminQuestion;
}

export function ViewQuestionModal({ question }: ViewQuestionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const detailsCards = [
    {
      icon: Tag,
      title: "النوع",
      value: question.type,
      className: "bg-primary/10 text-primary capitalize",
    },
    {
      icon: Users,
      title: "الاجابة الصحيحة",
      value: question.correctAnswer,
    },
    {
      icon: User,
      title: "تاريخ الانشاء",
      value: formatCreatedAt(question.createdAt),
    },
    {
      icon: Clock,
      title: "وقت السؤال",
      value: `${question.duration} ثانية`,
    },
  ];

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="gap-2 cursor-pointer"
      >
        <Eye className="w-4 h-4 text-primary" /> عرض التفاصيل
      </DropdownMenuItem>

      <BaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="تفاصيل السؤال"
        description="تفاصيل وبيانات السؤال."
      >
        <div className="space-y-4 py-2 text-right font-body">
          {/* Question Title */}
          <Title label="عنوان السؤال" title={question.question} />

          {/* Question Options */}
          <Message label="فئة السؤال" title={question.category} />

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            {detailsCards.map((card) => (
              <DetailsCard key={card.title} {...card} />
            ))}
          </div>

          {/* Footer Action */}
          <CloseBtn setIsOpen={setIsOpen} />
        </div>
      </BaseModal>
    </>
  );
}
