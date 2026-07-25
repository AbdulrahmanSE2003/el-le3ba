import { Button } from "@/components/ui/button";
import { quickActions } from "../utils/constants";
import { cn } from "@/lib/utils";

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
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Button
                variant={"secondary"}
                key={idx}
                size={"lg"}
                className={`px-3 py-7 flex items-center justify-start gap-3 group border border-border`}
              >
                <div
                  className={cn(
                    "rounded-lg p-2 transition-colors duration-200",
                    action.className,
                  )}
                >
                  {" "}
                  <Icon className="h-4 w-4" />
                </div>
                <div className={`flex flex-col items-start justify-center`}>
                  <div className="text-sm font-medium text-foreground">
                    {action.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {action.desc}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
