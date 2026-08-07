import { AlertTriangle } from "lucide-react";

interface Props {
  title: string;
  label: string;
}

export default function Warning({ title, label }: Props) {
  return (
    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3 text-destructive">
      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="text-xs space-y-1">
        <p className="font-semibold">تنبيه:</p>
        <p>
          أنت على وشك حذف {label}:{" "}
          <span className="font-bold underline">{title}</span>
        </p>
        <p className="text-muted-foreground text-[11px]">
          هذا الإجراء سيقوم بحذف السجل ولن تتمكن من استعادته لاحقاً.
        </p>
      </div>
    </div>
  );
}
