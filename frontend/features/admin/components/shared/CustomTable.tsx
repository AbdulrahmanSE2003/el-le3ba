import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SessionStatusBadge } from "../sessions/session-table/SessionStatusBadge";
import TableActions from "../sessions/session-table/TableActions";

import { formatDate } from "@/components/shared/formatted-date";

import { AdminSession } from "../../types/session";

import { Trophy } from "lucide-react";

interface Props {
  tableHeaders: string[];
  sessions: AdminSession[];
}

export default function CustomTable({ tableHeaders, sessions }: Props) {
  return (
    <div className="p-5 bg-white dark:bg-card rounded-lg">
      <Table className="text-center">
        {/* Table Headers */}
        <TableHeader className="bg-muted/50">
          <TableRow className="border-border">
            {tableHeaders.map((header) => (
              <TableHead
                key={header}
                className="font-bold text-foreground py-4 text-center"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {sessions.map((session) => (
            <TableRow
              key={session.teamCode}
              className="border-border hover:bg-muted/30 transition-colors"
            >
              {/* Team name and code */}
              <TableCell className="text-center">
                <div>
                  <p className="font-semibold text-xs text-foreground">
                    {session.teamName ?? "فريق محذوف"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.teamCode ?? "-"}
                  </p>
                </div>
              </TableCell>

              {/* Season name */}
              <TableCell className="text-xs text-muted-foreground">
                {session.season ?? "-"}
              </TableCell>

              {/* Status */}
              <TableCell>
                <SessionStatusBadge status={session.status} />
              </TableCell>

              {/* Points */}
              <TableCell>
                <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span>{session.points}</span>
                </div>
              </TableCell>

              {/* Started at */}
              <TableCell className="text-xs text-muted-foreground">
                {formatDate(session.startedAt)}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-center">
                <TableActions session={session} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
