import StatCard from "../shared/StatCard";
import { notificationsKpis } from "./constants/constants";

export function NotificationsKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {notificationsKpis.map((kpi) => (
        <StatCard
          key={kpi.title}
          title={kpi.title}
          value={kpi.value}
          Icon={kpi.icon}
          iconClassName={kpi.iconClassName}
          bgClassName={kpi.bgClassName}
        />
      ))}
    </div>
  );
}
