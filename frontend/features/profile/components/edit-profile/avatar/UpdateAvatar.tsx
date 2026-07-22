"use client";

import Avatars from "@/features/select-avatar/components/Avatars";
import Label from "./Label";

import { UserIcon } from "lucide-react";

import { updateAvatar } from "@/features/profile/actions";

import {
  showError,
  showInfo,
  showSuccess,
} from "@/components/shared/notifications";

import { useAvatar } from "@/hooks/useAvatar";
import { MyAlertModal } from "@/components/shared/MyAlertModal";

interface Props {
  avatar: string | null;
}

export default function UpdateAvatar({ avatar }: Props) {
  const {
    selectedAvatar,
    handleSelectAvatar,
    isOpen,
    setIsOpen,
    setSelectedAvatar,
  } = useAvatar(avatar || "");

  // Update the avatar
  async function handleUpdateAvatar() {
    if (!selectedAvatar) {
      // If no selection back to the user avatar
      setSelectedAvatar(avatar || "");

      showInfo("من فضلك اختر صورة شخصية");
      return;
    }

    const result = await updateAvatar(selectedAvatar);
    if (result.success) {
      showSuccess(result.message || "تم تحديث الصورة الشخصية بنجاح");
      return true;
    } else {
      showError(
        result.error || "فشل تحديث الصورة الشخصية. حاول مرة اخرى لاحقا",
      );
    }
  }

  return (
    <div className="flex items-center justify-between border-b pb-4">
      {/* Info */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <UserIcon className="text-muted-foreground w-5 h-5" />

        {/* Description */}
        <div>
          <p className="font-semibold text-sm">الصورة الشخصية</p>
          <p className="text-xs text-muted-foreground">
            تغيير صورتك الرمزية في اللعبة
          </p>
        </div>
      </div>

      {/* Select Avatar Modal */}
      <MyAlertModal
        open={isOpen}
        trigger={<Label onClick={() => setIsOpen(true)} />}
        title="تغيير الصورة الشخصية"
        content={
          <Avatars
            selectedAvatar={selectedAvatar}
            handleSelectAvatar={handleSelectAvatar}
          />
        }
        confirmText="حفظ التغييرات"
        cancelText="إلغاء"
        onConfirm={handleUpdateAvatar}
        onOpenChange={setIsOpen}
      />
    </div>
  );
}
