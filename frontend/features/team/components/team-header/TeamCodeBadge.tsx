"use client";

import { useState } from "react";
import { Copy, Check, Hash } from "lucide-react";
import { showSuccess } from "@/components/shared/notifications";

interface TeamCodeBadgeProps {
  code: string;
}

export default function TeamCodeBadge({ code }: TeamCodeBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      showSuccess("تم نسخ كود الفريق بنجاح");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback in case clipboard is disabled
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="اضغط لنسخ كود الفريق"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground border border-border transition-all cursor-pointer group"
    >
      <Hash className="w-3.5 h-3.5 text-primary" />
      <span>
        كود الفريق:{" "}
        <strong className="text-foreground tracking-wider font-mono select-all">
          {code}
        </strong>
      </span>
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-500 transition-transform scale-110" />
      ) : (
        <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}
