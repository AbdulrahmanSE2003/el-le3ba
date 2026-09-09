import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
  onSave: () => void;
  isPending: boolean;
  isDirty: boolean;
  saveLabel?: string;
}

export function SettingsSectionCard({
  title,
  description,
  icon: Icon,
  children,
  onSave,
  isPending,
  isDirty,
  saveLabel = "حفظ التغييرات",
}: Props) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-start gap-3 p-5 border-b border-border">
        <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {description}
          </p>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>

      <div className="flex items-center justify-end gap-2 px-5 py-3.5 bg-muted/30 border-t border-border">
        <Button
          onClick={onSave}
          disabled={isPending || !isDirty}
          size="sm"
          className="px-4"
        >
          {isPending ? "جاري الحفظ..." : saveLabel}
        </Button>
      </div>
    </div>
  );
}
