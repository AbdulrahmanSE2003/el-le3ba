"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SeasonsRes } from "../../api/seasons";
import { cn } from "@/lib/utils";
import { CustomPagination } from "@/features/super-admin/components/shared/CustomPagination";
import SeasonActions from "./SeasonActions";

const statusConfig = {
  active: {
    label: "نشط",
    variant: "default" as const,
    className:
      "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20",
  },
  upcoming: {
    label: "قادم",
    variant: "secondary" as const,
    className:
      "bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-500/20",
  },
  knockout: {
    label: "إقصائيات",
    variant: "outline" as const,
    className:
      "bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border-rose-500/20",
  },
  ended: {
    label: "منتهي",
    variant: "destructive" as const,
    className:
      "bg-slate-500/15 text-slate-600 hover:bg-slate-500/25 border-slate-500/20",
  },
};
const formatDate = (dateString?: string) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const DateCell = ({ date }: { date?: string }) => {
  const formatted = formatDate(date);
  if (!formatted) {
    return <span className="text-muted-foreground/40 font-mono">—</span>;
  }
  return (
    <time
      dateTime={date}
      className="font-mono text-xs text-muted-foreground whitespace-nowrap"
    >
      {formatted}
    </time>
  );
};

const SeasonsTable = ({ res }: { res: SeasonsRes }) => {
  const seasons = res.seasons.seasons;
  const data = res.seasons.pagination;
  return (
    <div className={`flex flex-col justify-between gap-3 min-h-88`}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50 [&_th]:text-center [&_th]:font-medium">
            <TableHead>العنوان</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>تاريخ البداية</TableHead>
            <TableHead>تاريخ الإنتهاء</TableHead>
            <TableHead>موعد الإقصائيات</TableHead>
            <TableHead>أنشأت بواسطة</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={`text-center bg-card`}>
          {!seasons.length ? (
            <TableRow>
              <TableCell colSpan={7} className={`p-6 text-muted-foreground`}>
                لا يوجد مواسم مطابقة.
              </TableCell>
            </TableRow>
          ) : (
            seasons.map((season) => {
              const status = statusConfig[season.status];
              return (
                <TableRow key={season._id}>
                  <TableCell className="font-medium">{season.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={status.variant}
                      className={cn(
                        status.className,
                        status.label === "نشط" ||
                          (status.label === "إقصائيات" && "animate-pulse"),
                      )}
                    >
                      {status.label}
                    </Badge>
                  </TableCell>
                  {/* Start Date */}
                  <TableCell>
                    <DateCell date={season.startDate} />
                  </TableCell>
                  {/* End Date */}
                  <TableCell>
                    <DateCell date={season.endDate} />
                  </TableCell>
                  <TableCell>
                    {season.knockoutStartDate ? (
                      <Badge variant={"secondary"}>
                        {formatDate(season.knockoutStartDate)}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground/50">—</span>
                    )}
                  </TableCell>
                  {/* Created By */}
                  <TableCell
                    className={`text-right text-muted-foreground flex flex-col gap-0.5`}
                  >
                    <span className={`text-foreground capitalize`}>
                      {season.createdBy?.name ?? "—"}
                    </span>
                    <span>{season.createdBy?.email ?? "—"}</span>
                  </TableCell>
                  <TableCell>
                    <SeasonActions season={season} />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <CustomPagination
        className={`mt-auto`}
        totalItems={data.total}
        totalPages={data.totalPages}
        limit={data.limit}
      />
    </div>
  );
};

export default SeasonsTable;
