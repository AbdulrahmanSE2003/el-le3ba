import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TeamsTableSkeleton() {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-right">
              <Skeleton className="h-4 w-4 mx-auto rounded" />
            </TableHead>
            <TableHead>بيانات الفريق</TableHead>
            <TableHead>الكابتن</TableHead>
            <TableHead>عدد الاعضاء</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>النقاط</TableHead>
            <TableHead>تاريخ الإنشاء</TableHead>
            <TableHead className="text-center">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="w-12 text-center">
                <Skeleton className="h-4 w-4 mx-auto rounded" />
              </TableCell>

              <TableCell>
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </TableCell>

              <TableCell>
                <Skeleton className="h-5 w-14 rounded-md" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-5 w-16 rounded-full" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>

              <TableCell className="text-center">
                <Skeleton className="h-8 w-8 rounded-md mx-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
