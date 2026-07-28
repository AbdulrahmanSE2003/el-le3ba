import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Column<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface ServerTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function ServerTable<T extends { id: string }>({
  columns,
  data,
  emptyMessage = "لا توجد بيانات متاحة.",
}: ServerTableProps<T>) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <Table className="text-right">
        <TableHeader className="bg-muted/50">
          <TableRow className="border-border hover:bg-transparent">
            {columns.map((col, idx) => (
              <TableHead
                key={idx}
                className={`font-bold text-foreground text-right py-4 ${col.className || ""}`}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow
                key={item.id}
                className="border-border hover:bg-muted/30 transition-colors"
              >
                {columns.map((col, idx) => (
                  <TableCell key={idx} className={col.className}>
                    {col.cell
                      ? col.cell(item)
                      : col.accessorKey
                        ? (item[col.accessorKey] as React.ReactNode)
                        : null}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
