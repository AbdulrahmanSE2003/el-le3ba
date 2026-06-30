"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import Button from "@/features/auth/components/AuthButton";
import MainTitle from "@/components/sidebar/Logo";

export default function AuthError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
      <MainTitle />

      {/* Error icon */}
      <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-danger" />
      </div>

      {/* Error message */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display font-bold text-xl text-dark dark:text-white">
          حدث خطأ غير متوقع
        </h2>
        <p className="font-body text-mid text-base max-w-xs mx-auto leading-relaxed">
          عذراً، حدث خطأ أثناء تحميل الصفحة. حاول مرة أخرى أو ارجع لاحقاً.
        </p>
      </div>

      {/* Retry button */}
      <Button onClick={reset} className="max-w-[200px]">
        <RotateCcw className="w-5 h-5 ml-2" />
        إعادة المحاولة
      </Button>
    </div>
  );
}
