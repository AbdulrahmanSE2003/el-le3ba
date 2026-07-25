import { Button } from "@/components/ui/button";
import { FileText, Settings, ShieldAlert, UserPlus } from "lucide-react";

const quickActions = [
  { title: "إضافة مستخدم", icon: UserPlus, desc: "إنشاء حساب مستخدم جديد" },
  { title: "إعدادات النظام", icon: Settings, desc: "تعديل تفضيلات المنصة" },
  { title: "توليد تقرير", icon: FileText, desc: "تصدير البيانات بصيغة PDF" },
  { title: "سجل الأمان", icon: ShieldAlert, desc: "مراجعة محاولات الدخول" },
];

const QuickActions = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
      <div>
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
                <div className="rounded-md bg-muted p-2 text-muted-foreground group-hover:text-primary transition-colors">
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
