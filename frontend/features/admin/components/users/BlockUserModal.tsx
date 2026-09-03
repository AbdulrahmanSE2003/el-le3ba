"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MyAlertModal } from "@/components/shared/MyAlertModal";
import { blockUserAction } from "@/features/admin/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";

interface BlockUserModalProps {
  userId: string;
  userName: string;
}

export function BlockUserModal({ userId, userName }: BlockUserModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleBlock = async () => {
    const res = await blockUserAction(userId);

    if (res.success) {
      toast.success(`تم حظر المستخدم ${userName} بنجاح`);
      router.refresh();
      return true;
    } else {
      toast.error(res.error || "فشل حظر المستخدم");
      return false;
    }
  };

  return (
    <MyAlertModal
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive gap-2 w-full pr-2 justify-start hover:text-destructive"
        >
          <Ban className="w-4 h-4" /> حظر
        </Button>
      }
      title={`تأكيد حظر "${userName}"`}
      description="هل أنت متأكد من رغبتك في حظر هذا المستخدم؟"
      confirmText="حظر الحساب"
      cancelText="إلغاء"
      onConfirm={handleBlock}
    />
  );
}
