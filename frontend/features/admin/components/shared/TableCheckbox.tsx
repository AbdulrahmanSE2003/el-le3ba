"use client";

import React, { createContext, useContext, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

// Context بسيط للتواصل بين Checkbox الـ Header و Checkboxes الصفوف
interface TableSelectionContextType {
  selectedIds: string[];
  toggleAll: (allIds: string[]) => void;
  toggleRow: (id: string) => void;
  isAllSelected: (allIds: string[]) => boolean;
}

const TableSelectionContext = createContext<TableSelectionContextType | null>(
  null,
);

// 1️⃣ Provider نغلف بيه الجدول
export function TableSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleAll = (allIds: string[]) => {
    if (selectedIds.length === allIds.length) {
      setSelectedIds([]); // إلغاء تحديد الكل
    } else {
      setSelectedIds(allIds); // تحديد الكل
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

// Hook لاستخدام الـ Selection في أي مكان (مثلاً أزرار Bulk Delete)
export function useTableSelection() {
  const context = useContext(TableSelectionContext);
  if (!context) {
    throw new Error(
      "useTableSelection must be used within TableSelectionProvider",
    );
  }
  return context;
}

// 2️⃣ Checkbox للـ Header
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

// 3️⃣ Checkbox لكل صف (Row)
export function RowCheckbox({ id }: { id: string }) {
  const { selectedIds, toggleRow } = useTableSelection();
  const checked = selectedIds.includes(id);

  return (
    <div className="flex items-center justify-center pr-3">
      <Checkbox checked={checked} onCheckedChange={() => toggleRow(id)} />
    </div>
  );
}
