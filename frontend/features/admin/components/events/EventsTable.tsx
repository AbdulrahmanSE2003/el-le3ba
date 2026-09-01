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
import { cn } from "@/lib/utils";
import { CustomPagination } from "@/features/super-admin/components/shared/CustomPagination";
import type { EventWithSeason } from "@/shared/types/event";
import EventActions from "./EventActions";

type EventStatus = "scheduled" | "running" | "finished";

const statusConfig: Record<
  EventStatus,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
    className: string;
  }
> = {
  running: {
    label: "نشط",
    variant: "default",
    className:
      "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20",
  },
  scheduled: {
    label: "قادم",
    variant: "secondary",
    className:
      "bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-500/20",
  },
  finished: {
    label: "منتهي",
    variant: "destructive",
    className:
      "bg-slate-500/15 text-slate-600 hover:bg-slate-500/25 border-slate-500/20",
  },
};

function computeEventStatus(
  startTime: string,
  endTime: string,
): EventStatus {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return "scheduled";
  if (now >= start && now < end) return "running";
  return "finished";
}

const formatDateTime = (dateString?: string) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const DateCell = ({ date }: { date?: string }) => {
  const formatted = formatDateTime(date);
  if (!formatted || formatted === "—") {
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

interface SeasonOption {
  _id: string;
  title: string;
}

interface EventsTableProps {
  events: EventWithSeason[];
  seasons: SeasonOption[];
  pagination: {
    currentPage: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const EventsTable = ({ events, seasons, pagination }: EventsTableProps) => {
  return (
    <div className={`flex flex-col justify-between gap-6`}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50 [&_th]:text-center [&_th]:font-medium">
            <TableHead>العنوان</TableHead>
            <TableHead>الموسم</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>وقت البداية</TableHead>
            <TableHead>وقت النهاية</TableHead>
            <TableHead>عدد المحاولات</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={`text-center bg-card`}>
          {!events.length ? (
            <TableRow>
              <TableCell colSpan={7} className={`p-6 text-muted-foreground`}>
                لا يوجد أحداث مطابقة.
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => {
              const status = computeEventStatus(event.startTime, event.endTime);
              const statusInfo = statusConfig[status];
              return (
                <TableRow key={event._id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    {event.season?.title ?? (
                      <span className="text-muted-foreground/50">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={statusInfo.variant}
                      className={cn(
                        statusInfo.className,
                        status === "running" && "animate-pulse",
                      )}
                    >
                      {statusInfo.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DateCell date={event.startTime} />
                  </TableCell>
                  <TableCell>
                    <DateCell date={event.endTime} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{event.maxAttempts}</Badge>
                  </TableCell>
                  <TableCell>
                    <EventActions event={event} seasons={seasons} />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <CustomPagination
        className={`mt-auto`}
        totalItems={pagination.total}
        totalPages={pagination.totalPages}
        limit={pagination.limit}
      />
    </div>
  );
};

export default EventsTable;
