import StatCard from "../shared/StatCard";
import { questionsKpis } from "./constants/constants";

export function QuestionsKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {questionsKpis.map((kpi) => (
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
