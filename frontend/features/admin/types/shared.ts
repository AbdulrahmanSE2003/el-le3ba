import { LucideIcon } from "lucide-react";
import React from "react";

export interface GenericKpiGridProps {
  items: StatCardItem[];
  columnsClassName?: string; // No. of columns
}

export interface StatCardItem {
  id?: string | number;
  title: string;
  value: string | number | React.ReactNode;
  icon: LucideIcon;
  iconClassName?: string;
  bgClassName?: string;
}

export interface Column<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

export interface ServerTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export interface DataTablePaginationProps {
  page: number;
  totalPages: number;
  totalResults: number;
  limit: number;
  itemLabel?: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  key: string;
  placeholder: string;
  options: FilterOption[];
}

export interface GenericFilterBarProps {
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  sortOptions?: FilterOption[];
}

export interface TableSelectionContextType {
  selectedIds: string[];
  toggleAll: (allIds: string[]) => void;
  toggleRow: (id: string) => void;
  isAllSelected: (allIds: string[]) => boolean;
}
