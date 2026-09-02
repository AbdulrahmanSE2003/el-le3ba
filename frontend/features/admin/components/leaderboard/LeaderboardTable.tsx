"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SeasonLeaderboardEntry } from "../../api/seasons";

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const rankBadge = (rank: number) => {
  if (rank === 1)
    return (
      <Badge className="bg-amber-500/15 text-amber-600 border-amber-500/20">
        🥇 1
      </Badge>
    );
  if (rank === 2)
    return (
      <Badge className="bg-slate-400/15 text-slate-500 border-slate-400/20">
        🥈 2
      </Badge>
    );
  if (rank === 3)
    return (
      <Badge className="bg-amber-700/15 text-amber-700 border-amber-700/20">
        🥉 3
      </Badge>
    );
  return <span className="text-muted-foreground font-mono">{rank}</span>;
};

const LeaderboardTable = ({
  leaderboard,
}: {
  leaderboard: SeasonLeaderboardEntry[];
}) => {
console.log(leaderboard);


  return (
    <div className="flex flex-col justify-between gap-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50 [&_th]:text-center [&_th]:font-medium">
            <TableHead className="w-16">المركز</TableHead>
            <TableHead>اسم الفريق</TableHead>
            <TableHead>النقاط</TableHead>
            <TableHead>المباريات</TableHead>
            <TableHead>آخر مباراة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center bg-card">
          {!leaderboard.length ? (
            <TableRow>
              <TableCell colSpan={5} className="p-6 text-muted-foreground">
                لا يوجد بيانات لوحة المتصدرين لهذا الموسم.
              </TableCell>
            </TableRow>
          ) : (
            leaderboard.map((entry, index) => (
              <TableRow key={entry.teamId}>
                <TableCell>{rankBadge(index + 1)}</TableCell>
                <TableCell className="font-medium">{entry.teamName}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{entry.seasonPoints}</Badge>
                </TableCell>
                <TableCell>{entry.sessionsPlayed}</TableCell>
                <TableCell>
                  <time
                    dateTime={entry.lastPlayedSession ?? undefined}
                    className="font-mono text-xs text-muted-foreground whitespace-nowrap"
                  >
                    {formatDate(entry.lastPlayedSession)}
                  </time>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
