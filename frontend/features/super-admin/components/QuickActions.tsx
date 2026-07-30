import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, UserPlus, BellRing, ShieldAlert } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="rounded-xl border border-accent bg-card p-6 shadow-sm space-y-4">
      <h2 className="text-base font-semibold">إجراءات سريعة</h2>
      <Separator className="bg-border" />

      <div className="flex flex-col gap-2.5 pt-1">
        {/* Primary Action - Create Admin */}
        <Button className="w-full justify-start gap-3 h-11 px-4 text-sm font-medium transition-all duration-200">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-foreground/20">
            <UserPlus className="h-4 w-4" />
          </div>
          إضافة مسؤول جديد
        </Button>

        {/* Secondary Action - Audit Logs */}
        <Button
          variant="outline"
          className="w-full justify-start gap-3 h-11 px-4 text-sm font-medium border-border hover:bg-muted/80 transition-all duration-200"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <FileText className="h-4 w-4" />
          </div>
          عرض سجلات المراجعة
        </Button>

        {/* Action - Send Broadcast */}
        <Button
          variant="outline"
          className="w-full justify-start gap-3 h-11 px-4 text-sm font-medium border-border hover:bg-muted/80 transition-all duration-200"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/10 text-purple-500">
            <BellRing className="h-4 w-4" />
          </div>
          إرسال إشعار عام
        </Button>

        {/* Destructive / Caution Action - Security Settings */}
        <Button
          variant="outline"
          className="w-full justify-start gap-3 h-11 px-4 text-sm font-medium border-border hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all duration-200"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-500/10 text-rose-500">
            <ShieldAlert className="h-4 w-4" />
          </div>
          إعدادات الحماية والأمان
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
