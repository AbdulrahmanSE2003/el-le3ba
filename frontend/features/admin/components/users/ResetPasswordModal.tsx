"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { resetUserPasswordAction } from "@/features/admin/actions/user.actions";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";

interface ResetPasswordModalProps {
  userId: string;
  userName: string;
}

export function ResetPasswordModal({
  userId,
  userName,
}: ResetPasswordModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await resetUserPasswordAction(userId);

      if (res.success) {
        toast.success(
          `تم إعادة تعيين كلمة السر لـ ${userName} بنجاح إلى: newPass1234`,
        );
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(res.error || "فشل إعادة تعيين كلمة السر");
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" title="إعادة تعيين كلمة السر" className="">
          <KeyRound className="w-4 h-4 text-primary" /> إعادة ضبط كلمة السر
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-semibold">
            إعادة تعيين كلمة السر لـ {userName}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            سيتم إعادة تعيين كلمة السر لهذا المستخدم إلى كلمة السر الافتراضية
            للسيستم:
            <span className="block mt-2 font-mono font-bold text-foreground dir-ltr text-center bg-muted p-2 rounded-md">
              newPass1234
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>إلغاء</AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            onClick={handleResetPassword}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {isLoading ? "جاري الإعادة..." : "تأكيد التعيين"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
