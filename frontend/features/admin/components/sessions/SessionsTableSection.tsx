"use client";

import { useMemo, useState } from "react";
import {
  Search,
  RotateCcw,
  Trophy,
  MoreVertical,
  Eye,
  OctagonX,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AdminSession } from "@/features/admin/types/session";
import { SessionStatusBadge } from "./SessionStatusBadge";
import { SessionDetailsDialog } from "./SessionDetailsDialog";
import { EndSessionAlert } from "./EndSessionAlert";
import { DeleteSessionAlert } from "./DeleteSessionAlert";
import { formatDate } from "@/components/shared/formatted-date";

interface EventOption {
  _id: string;
  title: string;
}

interface Props {
  initialSessions: AdminSession[];
  events: EventOption[];
}

export function SessionsTableSection({ initialSessions, events }: Props) {
  const [sessions] = useState<AdminSession[]>(initialSessions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const [detailsSession, setDetailsSession] = useState<AdminSession | null>(
    null,
  );
  const [endTarget, setEndTarget] = useState<AdminSession | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminSession | null>(null);

  function handleResetFilters() {
    setSearch("");
    setStatusFilter("all");
    setEventFilter("all");
    setSortBy("recent");
  }

  const filteredSessions = useMemo(() => {
    return sessions
      .filter((session) => {
        const teamName = session.teamId?.teamName ?? "";
        const teamCode = session.teamId?.teamCode ?? "";
        const matchesSearch =
          teamName.toLowerCase().includes(search.toLowerCase()) ||
          teamCode.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || session.status === statusFilter;
        const matchesEvent =
          eventFilter === "all" || session.eventId?._id === eventFilter;
        return matchesSearch && matchesStatus && matchesEvent;
      })
      .sort((a, b) => {
        if (sortBy === "score") return b.finalScore - a.finalScore;
        if (sortBy === "duration")
          return (b.durationSeconds ?? 0) - (a.durationSeconds ?? 0);
        return (
          new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
        );
      });
  }, [sessions, search, statusFilter, eventFilter, sortBy]);

  return (
    <div className="space-y-4">
      {/* ── Search & Filter Bar ── */}
      <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="relative w-full lg:w-96 flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="أبحث باسم الفريق أو الكود..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9 text-right bg-background border-border"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-background">
                <SelectValue placeholder="فلتر حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الحالات</SelectItem>
                <SelectItem value="in_progress">شغالة الآن</SelectItem>
                <SelectItem value="completed">مكتملة</SelectItem>
                <SelectItem value="abandoned">منسحب</SelectItem>
                <SelectItem value="expired">منتهية</SelectItem>
              </SelectContent>
            </Select>

            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue placeholder="فلتر حسب الموسم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل المواسم</SelectItem>
                {events.map((event) => (
                  <SelectItem key={event._id} value={event._id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="الترتيب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">الأحدث</SelectItem>
                <SelectItem value="score">أعلى نتيجة</SelectItem>
                <SelectItem value="duration">أطول مدة</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={handleResetFilters}
              title="تصفير الفلاتر"
              className="bg-background border-border hover:bg-muted"
            >
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table className="text-right">
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-right font-bold text-foreground py-4">
                الفريق
              </TableHead>
              <TableHead className="text-right font-bold text-foreground py-4">
                الموسم
              </TableHead>
              <TableHead className="text-right font-bold text-foreground py-4">
                الحالة
              </TableHead>
              <TableHead className="text-right font-bold text-foreground py-4">
                النقاط
              </TableHead>
              <TableHead className="text-right font-bold text-foreground py-4">
                بدأت
              </TableHead>
              <TableHead className="text-center font-bold text-foreground py-4">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSessions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  لا يوجد مباريات مطابقة للبحث.
                </TableCell>
              </TableRow>
            ) : (
              filteredSessions.map((session) => (
                <TableRow
                  key={session._id}
                  className="border-border hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="text-right">
                    <div>
                      <p className="font-semibold text-xs text-foreground">
                        {session.teamId?.teamName ?? "فريق محذوف"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.teamId?.teamCode ?? "-"}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    {session.eventId?.title ?? "-"}
                  </TableCell>

                  <TableCell>
                    <SessionStatusBadge status={session.status} />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                      <Trophy className="w-4 h-4 text-accent" />
                      <span>{session.finalScore}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(session.startedAt)}
                  </TableCell>

                  <TableCell className="text-center">
                    <DropdownMenu dir="rtl">
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="gap-2 cursor-pointer"
                          onClick={() => setDetailsSession(session)}
                        >
                          <Eye className="w-4 h-4 text-primary" /> عرض
                          التفاصيل
                        </DropdownMenuItem>

                        {session.status === "in_progress" && (
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer text-destructive dark:text-destructive hover:dark:text-accent-foreground"
                            onClick={() => setEndTarget(session)}
                          >
                            <OctagonX className="w-4 h-4" /> إيقاف المباراة
                          </DropdownMenuItem>
                        )}

                        {session.status !== "in_progress" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="gap-2 cursor-pointer text-destructive dark:text-destructive hover:dark:text-accent-foreground"
                              onClick={() => setDeleteTarget(session)}
                            >
                              <Trash2 className="w-4 h-4" /> حذف السجل
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Modals ── */}
      <SessionDetailsDialog
        session={detailsSession}
        open={!!detailsSession}
        onOpenChange={(open) => !open && setDetailsSession(null)}
      />

      {endTarget && (
        <EndSessionAlert
          sessionId={endTarget._id}
          teamName={endTarget.teamId?.teamName ?? "الفريق"}
          open={!!endTarget}
          onOpenChange={(open) => !open && setEndTarget(null)}
        />
      )}

      {deleteTarget && (
        <DeleteSessionAlert
          sessionId={deleteTarget._id}
          teamName={deleteTarget.teamId?.teamName ?? "الفريق"}
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
