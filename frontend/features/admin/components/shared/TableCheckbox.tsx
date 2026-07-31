"use client";

import React, { createContext, useContext, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
// import { TableSelectionContextType } from "../../types/users";

export interface TableSelectionContextType {
  selectedIds: string[];
  toggleAll: (allIds: string[]) => void;
  toggleRow: (id: string) => void;
  isAllSelected: (allIds: string[]) => boolean;
}

const TableSelectionContext = createContext<TableSelectionContextType | null>(
  null,
);

// Provider for wrapping the table
export function TableSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleAll = (allIds: string[]) => {
    if (selectedIds.length === allIds.length) {
      setSelectedIds([]); // Cancel select all
    } else {
      setSelectedIds(allIds); // Select all
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isAllSelected = (allIds: string[]) => {
    return allIds.length > 0 && selectedIds.length === allIds.length;
  };

  return (
    <TableSelectionContext.Provider
      value={{ selectedIds, toggleAll, toggleRow, isAllSelected }}
    >
      {children}
    </TableSelectionContext.Provider>
  );
}

// Hook for selection for bulk delete
export function useTableSelection() {
  const context = useContext(TableSelectionContext);
  if (!context) {
    throw new Error(
      "useTableSelection must be used within TableSelectionProvider",
    );
  }
  return context;
}

// Header checkbox
export function HeaderCheckbox({ allIds }: { allIds: string[] }) {
  const { toggleAll, isAllSelected, selectedIds } = useTableSelection();
  const checked = isAllSelected(allIds);
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < allIds.length;

  return (
    <div className="flex items-center justify-center pr-2">
      <Checkbox
        checked={isIndeterminate ? "indeterminate" : checked}
        onCheckedChange={() => toggleAll(allIds)}
      />
    </div>
  );
}

// Normal rwo checkbox
export function RowCheckbox({ id }: { id: string }) {
  const { selectedIds, toggleRow } = useTableSelection();
  const checked = selectedIds.includes(id);

  return (
    <div className="flex items-center justify-center pr-3">
      <Checkbox checked={checked} onCheckedChange={() => toggleRow(id)} />
    </div>
  );
}
