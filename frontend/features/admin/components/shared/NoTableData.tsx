import { TableCell, TableRow } from "@/components/ui/table";

export default function NoTableData({ title, colSpan }: { title: string; colSpan: number }) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="text-center py-8 text-muted-foreground"
      >
        لا يوجد {title} مطابقة.
      </TableCell>
    </TableRow>
  );
}
