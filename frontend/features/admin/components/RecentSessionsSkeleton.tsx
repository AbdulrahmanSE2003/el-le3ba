import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const RecentSessionsSkeleton = () => {
  return (
    <div className="lg:col-span-2 rounded-xl border bg-card shadow-sm">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between border-b p-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Table Skeleton */}
      <ScrollArea dir="rtl" className="h-104 p-0 border-0 rounded-md">
        <Table>
          <TableHeader>
            <TableRow className={`text-right`}>
              <TableHead>الفريق</TableHead>
              <TableHead>الموسم</TableHead>
              <TableHead>النقاط</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>انتهت</TableHead>
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                {/* الفريق */}
                <TableCell>
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </TableCell>

                {/* الموسم */}
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>

                {/* النقاط */}
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>

                {/* الحالة */}
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>

                {/* انتهت */}
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>

                {/* Action */}
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default RecentSessionsSkeleton;
