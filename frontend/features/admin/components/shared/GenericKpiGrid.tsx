import React from "react";
import {
  StatCardItem,
  GenericKpiGridProps,
} from "@/features/admin/types/users";

export function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName = "text-primary",
  bgClassName = "bg-primary/10",
}: StatCardItem) {
  return (
    <div className="bg-card border border-border p-4 py-6 rounded-xl shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      <div>
        <p className="text-sm text-muted-foreground font-medium mb-2">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
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
