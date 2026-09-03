import StatCard from "../shared/StatCard";
import { sessionsKpis } from "./constants/constants";

export function SessionsKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {sessionsKpis.map((session) => (
        <StatCard
          key={session.title}
          title={session.title}
          value={session.value}
          Icon={session.icon}
          iconClassName={session.iconClassName}
          bgClassName={session.bgClassName}
        />
      ))}
    </div>
  );
}
