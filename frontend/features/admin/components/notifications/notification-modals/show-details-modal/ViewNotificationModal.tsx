"use client";

import { useState } from "react";

import { BaseModal } from "@/features/admin/components/shared/BaseModal";
import Title from "@/features/admin/components/shared/Title";
import Message from "@/features/admin/components/shared/Message";
import CloseBtn from "@/features/admin/components/shared/CloseBtn";
import DetailsCard from "@/features/admin/components/shared/DetailsCard";

import { NotificationCampaign } from "@/features/admin/types/notification";

import { formatCreatedAt } from "@/lib/utils";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Eye, Calendar, User, Users, Tag } from "lucide-react";

interface ViewNotificationModalProps {
  notification: NotificationCampaign;
}

export function ViewNotificationModal({
  notification,
}: ViewNotificationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const detailsCards = [
    {
      icon: Tag,
      title: "النوع",
      value: notification.type,
      className: "bg-primary/10 text-primary capitalize",
    },
    {
      icon: Users,
      title: "عدد المستلمين",
      value: notification.recipientsCount,
    },
    {
      icon: User,
      title: "أنشئ بواسطة",
      value: notification.createdBy?.name,
    },
    {
      icon: Calendar,
      title: "تاريخ الإرسال",
      value: formatCreatedAt(notification.createdAt),
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
        title="تفاصيل الإشعار"
        description="تفاصيل وبيانات حملة الإشعار المرسلة."
      >
        <div className="space-y-4 py-2 text-right font-body">
          {/* Notification Title */}
          <Title label="عنوان الإشعار" title={notification.title} />

          {/* Notification Message */}
          <Message
            title={notification.message}
            label="محتوى الإشعار"
          />

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
