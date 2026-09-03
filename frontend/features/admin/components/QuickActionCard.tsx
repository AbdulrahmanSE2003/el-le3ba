import { Button } from "@/components/ui/button";
import { quickActions } from "../utils/constants";
import { cn } from "@/lib/utils";

const QuickActionCard = ({
  action,
  className,
}: {
  action: (typeof quickActions)[0];
  className?: string;
}) => {
  const Icon = action.icon;
  return (
    <Button
      disabled={!action.component}
      variant={"secondary"}
      size={"lg"}
      className={cn(
        `px-3 py-7 flex items-center justify-start gap-3 group border border-border`,
        action.component
          ? "cursor-pointer  border border-border"
          : "cursor-not-allowed disabled:opacity-50 border border-accent",
        className,
      )}
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
        <div className="text-xs text-muted-foreground">{action.desc}</div>
      </div>
    </Button>
  );
};

export default QuickActionCard;
