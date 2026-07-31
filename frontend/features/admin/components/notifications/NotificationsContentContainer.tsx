import NotificationFilter from "./notification-filter/NotificationFilter";
import NotificationsTable from "./notification-table/NotificationsTable";

import { tableHeaders } from "./constants/constants";
import { fetchNotifications } from "../../actions/notifications";

export default async function NotificationsContentContainer() {
  // const res = await fetchNotifications();
  // console.log(res);

  return (
    <div className="space-y-4">
      <NotificationFilter />

      <NotificationsTable tableHeaders={tableHeaders} />
    </div>
  );
}
