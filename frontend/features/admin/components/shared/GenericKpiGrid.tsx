import React from "react";
import {
  StatCardItem,
  GenericKpiGridProps,
} from "@/features/admin/types/shared";
import { TrendingDown, TrendingUp } from "lucide-react";

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconClassName = "text-primary",
  bgClassName = "bg-primary/10",
}: StatCardItem) {
  const isPositive = (change ?? 0) > 0;
  const isNegative = (change ?? 0) < 0;
  return (
    <div className="bg-card border border-border p-4 py-6 rounded-xl shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      <div>
        <p className="text-sm text-muted-foreground font-medium mb-4">
          {title}
        </p>
        <div className="flex items-center gap-6">
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
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
      <div className={`p-3 rounded-lg ${bgClassName}`}>
        <Icon className={`w-6 h-6 ${iconClassName}`} />
      </div>
    </div>
  );
}

export function GenericKpiGrid({
  items,
  columnsClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}: GenericKpiGridProps) {
  return (
    <div className={`grid ${columnsClassName} gap-4`}>
      {items.map((card, index) => (
        <StatCard key={card.id || index} {...card} />
      ))}
    </div>
  );
}
