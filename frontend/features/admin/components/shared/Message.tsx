import { Bell } from "lucide-react";

interface Props {
  title: string;
  label: string;
}

export default function Message({ title, label }: Props) {
  return (
    <div className="p-3 bg-muted/40 rounded-lg border border-border">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
        <Bell className="w-3.5 h-3.5 text-primary" />
        <span>{label}</span>
      </div>

      <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
        {title}
      </p>
    </div>
  );
}
