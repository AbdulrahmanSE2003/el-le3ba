import { ClipboardList } from "lucide-react";

const RULES = [
  { id: 1, label: "20 سؤال لكل مباراة" },
  { id: 2, label: "مدة المباراة 7 دقائق" },
  { id: 4, label: "الإجابة الأسرع = نقاط أكثر" },
  { id: 5, label: "لا يمكن الرجوع للسؤال السابق" },
  { id: 6, label: "يتم احتساب النتيجة فور انتهاء الوقت" },
  {
    id: 7,
    label:
      "عند إرسال أكثر من إجابة من الفريق، تُحتسب أول إجابة فقط ويتم تجاهل الباقي",
  },
];

const RulesSection = () => (
  <div className="w-full flex flex-col gap-y-4 border border-primary/30 bg-primary/15 dark:border-primary/20 dark:bg-primary/5 rounded-lg p-4">
    <span className="flex items-center text-foreground font-semibold gap-1 text-sm">
      <ClipboardList className="size-4" />
      قواعد اللعبة
    </span>

    <div className="space-y-2">
      {RULES.map((rule) => (
        <div
          key={rule.id}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>{rule.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default RulesSection;
