import { Bell } from "lucide-react";

export default function Message({ message }: { message: string }) {
  return (
    <div className="p-3 bg-muted/40 rounded-lg border border-border">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
        <Bell className="w-3.5 h-3.5 text-primary" />
        <span>محتوى الرسالة</span>
      </div>

      <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
        {message}
      </p>
    </div>
  );
}
