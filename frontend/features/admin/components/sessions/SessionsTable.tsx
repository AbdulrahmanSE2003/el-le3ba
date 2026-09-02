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
import { SessionsRes } from "../../api/sessions";
import { cn } from "@/lib/utils";
import { CustomPagination } from "@/features/super-admin/components/shared/CustomPagination";

const statusConfig = {
  running: {
    label: "شغالة",
    variant: "default" as const,
    className:
      "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20",
  },
  completed: {
    label: "مكتملة",
    variant: "secondary" as const,
    className:
      "bg-blue-500/15 text-blue-600 hover:bg-blue-500/25 border-blue-500/20",
  },
  scored: {
    label: "مُسجلة",
    variant: "outline" as const,
    className:
      "bg-purple-500/15 text-purple-500 hover:bg-purple-500/25 border-purple-500/20",
  },
};

const endReasonConfig = {
  completed: { label: "—" },
  expired: { label: "منتهية" },
  abandoned: { label: "مهجورة" },
  flagged: { label: "مشبوهة" },
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

const SessionsTable = ({ res }: { res: SessionsRes }) => {
  const sessions = res.sessions.sessions;
  const data = res.sessions.pagination;
  return (
    <div className={`flex flex-col justify-between gap-6`}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50 [&_th]:text-center [&_th]:font-medium">
            <TableHead>الفريق</TableHead>
            <TableHead>الحدث</TableHead>
            <TableHead>السكور</TableHead>
            <TableHead>الإجابات الصح</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>السبب</TableHead>
            <TableHead>التاريخ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={`text-center bg-card`}>
          {!sessions.length ? (
            <TableRow>
              <TableCell colSpan={7} className={`p-6 text-muted-foreground`}>
                لا يوجد مباريات مطابقة.
              </TableCell>
            </TableRow>
          ) : (
            sessions.map((session) => {
              const status = statusConfig[session.status];
              const reason = session.endReason
                ? endReasonConfig[session.endReason]
                : null;
              return (
                <TableRow key={session._id}>
                  <TableCell className="font-medium">
                    {session.teamId?.teamName ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {session.eventId?.title ?? "—"}
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {session.finalScore}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {session.correctAnswers}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={status.variant}
                      className={cn(
                        status.className,
                        session.status === "running" && "animate-pulse",
                      )}
                    >
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {reason ? (
                      reason.label === "—" ? (
                        <span className="text-muted-foreground/50">—</span>
                      ) : (
                        <span className="text-muted-foreground">
                          {reason.label}
                        </span>
                      )
                    ) : (
                      <span className="text-muted-foreground/50">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DateCell date={session.startedAt} />
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

export default SessionsTable;
