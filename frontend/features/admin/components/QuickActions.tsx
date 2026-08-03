import { quickActions } from "../utils/constants";
import QuickActionCard from "./QuickActionCard";

const QuickActions = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
      <div className={`space-y-1`}>
        <h2 className="text-lg font-semibold text-card-foreground">
          إجراءات سريعة
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          المهام الأكثر استخداماً في النظام
        </p>

        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => {
            const Component = action.component;

            return Component ? (
              <Component
                key={action.title}
                trigger={
                  <QuickActionCard action={action} className={`w-full`} />
                }
              />
            ) : (
              <QuickActionCard key={action.title} action={action} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
