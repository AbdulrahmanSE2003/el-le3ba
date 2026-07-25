import Link from "next/link";
import { ArrowUpRight, MoreVertical } from "lucide-react";

import Error from "@/app/error";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getDashboardRecentSessions } from "../api/shared";
import { RecentSession } from "@/shared/api/helpers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const statusMap = {
  completed: {
    label: "مكتملة",
    className: "bg-emerald-500/10 text-emerald-500",
    dot: "bg-emerald-500",
  },
  abandoned: {
    label: "منسحب",
    className: "bg-amber-500/10 text-amber-500",
    dot: "bg-amber-500",
  },
  expired: {
    label: "منتهية",
    className: "bg-red-500/10 text-red-500",
    dot: "bg-red-500",
  },
};

export default async function RecentSessions() {
  const sessionsRes = await getDashboardRecentSessions();

  if (!sessionsRes.success) return <Error />;

  const sessions = sessionsRes.data.recentSessions;

  return (
    <div className="lg:col-span-2 rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <div className={`space-y-1`}>
          <h2 className="text-lg font-semibold">المباريات الأخيرة</h2>
          <p className="text-xs text-muted-foreground">
            آخر 10 جلسات تم إنشاؤها
          </p>
        </div>

        <Button variant="link" size="xs" asChild>
          <Link href="/admin/sessions" className="flex items-center gap-1">
            عرض الكل
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      <ScrollArea dir="rtl" className="h-112 p-0 border-0 rounded-md ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">الفريق</TableHead>
              <TableHead className="text-right">الموسم</TableHead>
              <TableHead className="text-right">النقاط</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">انتهت</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {sessions.map((session: RecentSession) => {
              const status =
                statusMap[session.endReason as keyof typeof statusMap];

              return (
                <TableRow key={session._id} className={`text-muted-foreground`}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          `text-foreground font-medium`,
                          !session.teamId?.teamName ? "opacity-50" : "",
                        )}
                      >
                        {session.teamId?.teamName ?? "فريق محذوف"}
                      </span>

                      {session.teamId?.teamCode && (
                        <span className="text-xs text-muted-foreground">
                          #{session.teamId.teamCode}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>{session.eventId?.title ?? "-"}</TableCell>

                  <TableCell className="font-semibold">
                    {session.finalScore}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                      <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {new Date(session.completedAt).toLocaleString("ar-EG")}
                  </TableCell>

                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
