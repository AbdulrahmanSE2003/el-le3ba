import { formatPoints } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  Icon: LucideIcon;
}

const StatCard = ({ label, value, Icon }: StatCardProps) => (
  <div className="border border-primary/35 bg-background rounded-lg p-5 flex flex-col gap-y-3 hover:border-primary/60 transition-colors duration-300 shadow-sm group">
    <div className="text-muted-foreground text-xs font-medium flex items-center gap-2  group-hover:text-accent transition-colors duration-300">
      <Icon className="size-4 " />
      <span>{label}</span>
    </div>
    <span className="tabular-nums text-3xl group-hover:text-accent transition-colors duration-300 font-display font-bold tracking-wide">
      {formatPoints(value, "ar-EG")}
    </span>
  </div>
);

export default StatCard;
