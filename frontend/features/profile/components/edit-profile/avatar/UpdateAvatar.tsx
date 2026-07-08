"use client";

import Avatars from "@/features/select-avatar/components/Avatars";
import Label from "./Label";

import { AlertModal } from "@/components/shared/AlertModal";

import { UserIcon } from "lucide-react";
import { useState } from "react";

import { updateAvatar } from "@/features/profile/actions";

import {
  showError,
  showInfo,
  showSuccess,
} from "@/components/shared/notifications";

export default function UpdateAvatar() {
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false);

  // select avatar when click and unselect when click again
  function handleSelectAvatar(avatarName: string) {
    if (selectedAvatar === avatarName) {
      setSelectedAvatar("");
    } else {
      setSelectedAvatar(avatarName);
    }
  }

  // Update the avatar
  async function handleUpdateAvatar() {
    if (!selectedAvatar) {
      showInfo("من فضلك اختر صورة شخصية");
      return;
    }

    const result = await updateAvatar(selectedAvatar);

    if (result.success) {
      showSuccess(result.message || "تم تحديث الصورة الشخصية بنجاح");
      setIsOpen(false);
    } else {
      showError(result.error || "فشل تحديث الصورة الشخصية. حاول مرة اخرى لاحقا");
      setIsOpen(false);
    }

    setSelectedAvatar("");
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
      <AlertModal
        open={isOpen}
        trigger={<Label onClick={() => setIsOpen(true)} />}
        title="تغيير الصورة الشخصية"
        description={
          <Avatars
            selectedAvatar={selectedAvatar}
            handleSelectAvatar={handleSelectAvatar}
          />
        }
        confirmText="حفظ التغييرات"
        cancelText="إلغاء"
        onConfirm={handleUpdateAvatar}
      />
    </div>
  );
}
