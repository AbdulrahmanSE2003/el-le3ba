"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BaseModal } from "@/features/admin/components/shared/BaseModal";
import { UserForm } from "@/features/admin/components/users/UserForm";
import { updateUserAction } from "@/features/admin/actions/user.actions";
import { type UpdateUserFormValues } from "@/features/admin/schema/userSchema";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface UserData {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface EditUserModalProps {
  user: UserData;
}

export function EditUserModal({ user }: EditUserModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdateUser = async (data: UpdateUserFormValues) => {
    setIsLoading(true);
    try {
      const response = await updateUserAction(user._id, data);

      if (response.success) {
        toast.success("تم تحديث بيانات المستخدم بنجاح!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(response.error || "فشل تحديث البيانات");
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ غير متوقع، حاول لاحقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="gap-2 w-full text-right justify-start"
        variant="ghost"
        onClick={() => setIsOpen(true)}
      >
        <Edit className="w-4 h-4 text-primary" /> تعديل البيانات
      </Button>

      <BaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="تعديل بيانات المستخدم"
        description="تعديل بيانات الحساب وحالة التفعيل."
      >
        <UserForm
          key={user._id}
          mode="update"
          initialValues={{
            name: user.name,
            email: user.email,
            isActive: user.isActive,
          }}
          onSubmit={handleUpdateUser}
          isLoading={isLoading}
        />
      </BaseModal>
    </>
  );
}
