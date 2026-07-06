"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import MainTitle from "@/components/sidebar/Logo";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const handleReset = () => {
    reset();

    setTimeout(() => {
      router.refresh();
    }, 100);
  };

  const handleHardRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 text-center min-h-[60vh]">
      <MainTitle />

      {/* Error icon */}
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>

      {/* Error message */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display font-bold text-xl text-foreground">
          حدث خطأ غير متوقع
        </h2>
        <p className="text-muted-foreground text-base max-w-xs mx-auto leading-relaxed">
          عذراً، حدث خطأ أثناء تحميل الصفحة. حاول مرة أخرى أو ارجع لاحقاً.
        </p>
        {process.env.NODE_ENV === "development" && (
          <p className="text-sm text-destructive mt-2 max-w-md mx-auto">
            {error.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button
          onClick={handleReset}
          className="rounded-md bg-primary px-6 py-2.5 text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer font-medium"
        >
          <RotateCcw className="w-4 h-4 inline-block ml-2" />
          إعادة المحاولة
        </button>

        <button
          onClick={handleHardRefresh}
          className="rounded-md bg-secondary px-6 py-2.5 text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer font-medium"
        >
          تحديث الصفحة
        </button>
      </div>

      {/* Error details in development */}
      {process.env.NODE_ENV === "development" && (
        <details className="mt-4 w-full max-w-2xl">
          <summary className="cursor-pointer text-sm text-muted-foreground">
            تفاصيل الخطأ
          </summary>
          <pre className="mt-2 overflow-auto rounded-lg bg-muted p-4 text-left text-xs text-foreground/80 max-h-60">
            {error.stack || error.message}
          </pre>
        </details>
      )}
    </div>
  );
}
