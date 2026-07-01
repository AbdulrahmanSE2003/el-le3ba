"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import MainTitle from "@/components/sidebar/Logo";

export default function AuthError({
  error,
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
      <button
        onClick={reset}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition cursor-pointer"
      >
        <RotateCcw className="w-4 h-4 inline-block mr-2" />
        إعادة المحاولة
      </button>

      {process.env.NODE_ENV === "development" && (
        <pre className="mt-4 overflow-auto rounded bg-muted p-4 text-left text-xs">
          {error.message}
        </pre>
      )}
    </div>
  );
}
