import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  value: any;
  className?: string;
}

export default function DetailsCard({
  icon: Icon,
  title,
  value,
  className,
}: Props) {
  return (
    <div className="p-3 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
        <Icon className="w-3.5 h-3.5 text-primary" />
        <span>{title}</span>
      </div>
      <span
        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}
      >
        {value}
      </span>
    </div>
  );
}
