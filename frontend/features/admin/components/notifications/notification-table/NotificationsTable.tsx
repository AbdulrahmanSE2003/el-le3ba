import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableActions from "./TableActions";

import { getAllNotifications } from "@/features/admin/api/shared";

import Error from "@/app/error";

import { formatCreatedAt } from "@/lib/utils";

import { NotificationsPagination } from "../pagination/NotificationsPagination";

interface Props {
  tableHeaders: string[];
}

export default async function NotificationsTable({ tableHeaders }: Props) {
  const notificationsTableRes = await getAllNotifications();
  if (!notificationsTableRes.success) return <Error />;

  const notifications = notificationsTableRes.data.campaigns.campaigns;
  console.log(notifications);

  const campaigns = notificationsTableRes.data.campaigns;
  console.log(campaigns);

  return (
    <div className="rounded-lg space-y-4">
      <Table className="text-center">
        {/* Table Headers */}
        <TableHeader className=" rounded-2xl">
          <TableRow className="bg-background">
            {tableHeaders.map((header) => (
              <TableHead
                key={header}
                className="font-bold text-foreground py-4 text-center min-w-30"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className={`bg-card`}>
          {/* No notifications to display */}
          {notifications.length === 0 && (
            <TableRow className={``}>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                لا يوجد إشعارات مطابقة.
              </TableCell>
            </TableRow>
          )}

          {/* Notifications rows */}
          {notifications.map((notification) => (
            <TableRow
              key={notification._id}
              className="border-border font-normal hover:bg-muted/30 text-center transition-colors"
            >
              {/* Title  */}
              <TableCell className=" max-w-60">
                <p className="text-xs font-semibold text-foreground truncate">
                  {notification.title}
                </p>
              </TableCell>

              {/* Message preview */}
              <TableCell className=" max-w-60">
                <p className="text-xs text-muted-foreground truncate">
                  {notification.message}
                </p>
              </TableCell>

              {/* Type */}
              <TableCell>{notification.type}</TableCell>

              {/* Recipients count */}
              <TableCell className="text-xs font-semibold text-foreground">
                {notification.recipientsCount.toLocaleString("ar-EG")}
              </TableCell>

              {/* Created By */}
              <TableCell className={`capitalize`}>
                {notification.createdBy.name}
              </TableCell>

              {/* Created At */}
              <TableCell className={`capitalize`}>
                {formatCreatedAt(notification.createdAt)}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-center">
                <TableActions notification={notification} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <NotificationsPagination campaigns={campaigns} />
    </div>
  );
}
