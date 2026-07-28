import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AdminNotification } from "@/features/admin/types/notification";

import { NotificationTypeBadge } from "./NotificationTypeBadge";
import { NotificationStatusBadge } from "./NotificationStatusBadge";
import TableActions from "./TableActions";

interface Props {
  tableHeaders: string[];
  notifications: AdminNotification[];
}

export default function NotificationsTable({
  tableHeaders,
  notifications,
}: Props) {
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
          {notifications.map((notification) => {
            const readRate =
              notification.status === "sent" && notification.recipientsCount
                ? Math.round(
                    (notification.readCount / notification.recipientsCount) *
                      100,
                  )
                : null;

            return (
              <TableRow
                key={notification._id}
                className="border-border hover:bg-muted/30 transition-colors"
              >
                {/* Title + message preview */}
                <TableCell className="text-right max-w-[240px]">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {notification.message}
                  </p>
                </TableCell>

                {/* Type */}
                <TableCell>
                  <NotificationTypeBadge type={notification.type} />
                </TableCell>

                {/* Audience */}
                <TableCell className="text-xs text-muted-foreground">
                  {notification.audience.label}
                </TableCell>

                {/* Recipients count */}
                <TableCell className="text-xs font-semibold text-foreground">
                  {notification.recipientsCount.toLocaleString("ar-EG")}
                </TableCell>

                {/* Read rate */}
                <TableCell className="text-xs font-semibold text-foreground">
                  {readRate !== null ? `${readRate}%` : "-"}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <NotificationStatusBadge status={notification.status} />
                </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <TableActions notification={notification} />
                </TableCell>
              </TableRow>
            );
          })}

          {notifications.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={tableHeaders.length}
                className="text-center py-8 text-muted-foreground"
              >
                لا يوجد إشعارات مطابقة.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
