import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  hint?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

export function SettingsField({ label, hint, children, fullWidth }: Props) {
  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth && "sm:col-span-2")}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
