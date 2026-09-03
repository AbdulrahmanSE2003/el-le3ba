import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface Stat {
  title: string;
  Icon?: LucideIcon;
  value: string | number;
  description?: string;
  change?: number;
  iconClassName?: string;
  bgClassName?: string;
}

const StatCard = ({
  title,
  Icon,
  value,
  change,
  description,
  iconClassName,
  bgClassName,
}: Stat) => {
  const isPositive = (change ?? 0) > 0;
  const isNegative = (change ?? 0) < 0;

  return (
    <div
      className={`group rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md ${bgClassName}`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-md font-medium text-foreground">{title}</h4>
        {Icon && (
          <div
            className={`rounded-lg bg-muted p-2 text-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground ${iconClassName}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <span className="mt-2 block text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
        {value || 0}
      </span>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{description}</p>

        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold ${
              isPositive
                ? "text-emerald-500"
                : isNegative
                  ? "text-red-500"
                  : "text-muted-foreground"
            }`}
          >
            {isPositive && <TrendingUp className="h-3.5 w-3.5" />}
            {isNegative && <TrendingDown className="h-3.5 w-3.5" />}

            <span>
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
