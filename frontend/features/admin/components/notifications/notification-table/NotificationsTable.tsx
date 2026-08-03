import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableActions from "./TableActions";
import { NotificationTypeBadge } from "./NotificationTypeBadge";

import { formatCreatedAt } from "@/lib/utils";

import { NotificationsPagination } from "../pagination/NotificationsPagination";
import { NotificationCampaignsRes } from "@/features/admin/types/notification";
import NoPage from "../NoPage";

interface Props {
  tableHeaders: string[];
  campaigns: NotificationCampaignsRes;
}

export default async function NotificationsTable({
  tableHeaders,
  campaigns,
}: Props) {
  // Notifications table data
  const notifications = campaigns.campaigns;

  // Pagination data
  const page = campaigns.page || 1;
  const totalPages = campaigns.totalPages || 1;

  if (page > totalPages) {
    return <NoPage requestedPage={page} totalPages={totalPages} />;
  }

  return (
    <div className="rounded-lg space-y-4">
      <div className="p-5 bg-white dark:bg-card rounded-lg">
      <Table className="text-center">
        {/* Table Headers */}
        <TableHeader className="bg-muted/50">
          <TableRow className="border-border">
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
        <TableBody>
          {/* No notifications to display */}
          {notifications.length === 0 && (
            <TableRow>
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
              <TableCell className="text-right max-w-[260px]">
                <p className="text-xs font-medium text-foreground truncate">
                  {notification.title}
                </p>
              </TableCell>

              {/* Message preview */}
              <TableCell className="text-right max-w-[260px]">
                <p className="text-xs text-muted-foreground truncate">
                  {notification.message}
                </p>
              </TableCell>

              {/* Type */}
              <TableCell>
                <NotificationTypeBadge type={notification.type} />
              </TableCell>

              {/* Recipients count */}
              <TableCell className="text-xs font-semibold text-foreground">
                {notification.recipientsCount.toLocaleString("ar-EG")}
              </TableCell>

              {/* Created By */}
              <TableCell className="capitalize text-xs text-foreground">
                {notification.createdBy.name}
              </TableCell>

              {/* Created At */}
              <TableCell className="capitalize text-xs text-muted-foreground">
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
      </div>

      {/* Pagination */}
      <NotificationsPagination page={page} totalPages={totalPages} />
    </div>
  );
}
