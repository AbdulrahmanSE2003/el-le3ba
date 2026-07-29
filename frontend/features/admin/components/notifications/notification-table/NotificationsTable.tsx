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

export default async function NotificationsTable() {
  const notificationsTableRes = await getAllNotifications();
  if (!notificationsTableRes.success) return <Error />;

  const notifications = notificationsTableRes.data.campaigns.campaigns;

  return (
    <div className="rounded-lg ">
      <Table className="text-center">
        {/* Table Headers */}
        <TableHeader className=" rounded-2xl">
          <TableRow className="bg-background">
            <TableHead className="font-bold text-foreground py-4 text-center">
              الإسم
            </TableHead>
            <TableHead className="font-bold text-foreground py-4 text-center">
              الرسالة{" "}
            </TableHead>
            <TableHead className="font-bold text-foreground py-4 text-center">
              النوع{" "}
            </TableHead>
            <TableHead className="font-bold text-foreground py-4 text-center">
              عدد المتلقين{" "}
            </TableHead>
            <TableHead className="font-bold text-foreground py-4 text-center">
              تمت بواسطة{" "}
            </TableHead>
            <TableHead className="font-bold text-foreground py-4 text-center">
              وقت الإرسال{" "}
            </TableHead>
            <TableHead className="font-bold text-foreground py-4 text-center">
              الإجراءات{" "}
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className={`bg-card`}>
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

          {notifications.map((notification) => (
            <TableRow
              key={notification._id}
              className="border-border font-normal hover:bg-muted/30 text-center transition-colors"
            >
              {/* Title + message preview */}
              <TableCell className=" max-w-60">
                <p className="text-xs font-semibold text-foreground truncate">
                  {notification.title}
                </p>
              </TableCell>
              <TableCell className=" max-w-60">
                <p className="text-xs text-muted-foreground truncate">
                  {notification.message}
                </p>
              </TableCell>

              {/* Type */}
              <TableCell>
                {/* TODO */}
                {/* <NotificationTypeBadge type={notification.type} /> */}
                {notification.type}
              </TableCell>

              {/* Audience */}
              {/* <TableCell className="text-xs text-muted-foreground">
                {notification.audience}
                </TableCell> */}

              {/* Recipients count */}
              <TableCell className="text-xs font-semibold text-foreground">
                {notification.recipientsCount.toLocaleString("ar-EG")}
              </TableCell>

              <TableCell className={`capitalize`}>
                {notification.createdBy.name}
              </TableCell>
              <TableCell className={`capitalize`}>
                {formatCreatedAt(notification.createdAt)}
              </TableCell>
              {/* Read rate */}
              {/* <TableCell className="text-xs font-semibold text-foreground">
                {readRate !== null ? `${readRate}%` : "-"}
              </TableCell> */}

              {/* Status */}
              {/* <TableCell>
                <NotificationStatusBadge status={notification.status} />
              </TableCell> */}

              {/* Actions */}
              <TableCell className="text-center">
                <TableActions notification={notification} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
