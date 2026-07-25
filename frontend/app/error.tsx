"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function Error({
  title = "حدث خطأ ما!",
  message = "عذراً، حدث خطأ أثناء تحميل الصفحة. حاول مرة أخرى أو ارجع لاحقاً.",
  actionLabel,
  actionHref,
}: ErrorProps) {
  return (
    <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>

      {actionLabel && actionHref && (
        <Button asChild className="mt-6">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
