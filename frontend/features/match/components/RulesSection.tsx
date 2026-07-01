import { ClipboardList } from "lucide-react";

const RULES = [
  { id: 1, label: "20 سؤال" },
  { id: 2, label: "5 دقائق" },
  { id: 3, label: "إجابة اسرع = نقاط أكتر" },
];

const RulesSection = () => (
  <div
    className={
      "w-full flex flex-col gap-y-4 border border-primary/30 bg-primary/15 " +
      "dark:border-primary/20 dark:bg-primary/5 rounded-lg p-4"
    }
  >
    <span className="flex items-center text-foreground font-semibold gap-1 text-sm">
      <ClipboardList className="size-4" />
      قواعد اللعبة
    </span>

    <div className="flex items-center gap-3">
      {RULES.map((rule) => (
        <span
          key={rule.id}
          className={
            "bg-muted border border-primary/50 rounded-full " +
            "text-card-foreground/85 text-xs p-1 px-3 " +
            "dark:border-primary/20 dark:bg-primary/5"
          }
        >
          {rule.label}
        </span>
      ))}
    </div>
  </div>
);
export default RulesSection;
