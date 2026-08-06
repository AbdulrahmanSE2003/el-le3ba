import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SendNotification from "@/features/admin/components/notifications/send-notification/SendNotification";
import { FileText, UserPlus, BellRing, ShieldAlert } from "lucide-react";
import AddAdmin from "./admins/AddAdmin";

const QuickActions = () => {
  return (
    <div className="rounded-xl border border-accent bg-card p-6 shadow-sm space-y-4">
      <h2 className="text-base font-semibold">إجراءات سريعة</h2>
      <Separator className="bg-border" />

      <div className="flex flex-col gap-2.5 pt-1">
        {/* Primary Action - Create Admin */}
        <AddAdmin
          trigger={
            <Button className="w-full bg-primary/15 text-foreground justify-start gap-3 h-11 px-4 text-sm font-medium border-border hover:bg-primary/30 transition-all duration-300">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-foreground/20">
                <UserPlus className="size-4" />
              </div>
              إضافة مسؤول جديد
            </Button>
          }
        />
        {/* Secondary Action - Audit Logs */}
        <Button
          disabled
          className="w-full bg-accent/15 text-foreground justify-start gap-3 h-11 px-4 text-sm font-medium border-border hover:bg-accent/30 transition-all duration-300"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/30 text-accent">
            <FileText className="size-4" />
          </div>
          عرض سجلات المراجعة
        </Button>

        {/* Action - Send Broadcast */}
        <SendNotification
          trigger={
            <Button className="w-full bg-purple-500/10 text-foreground justify-start gap-3 h-11 px-4 text-sm font-medium border-border hover:bg-purple-500/20 transition-all duration-300">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/10 text-purple-500">
                <BellRing className="size-4" />
              </div>
              إرسال إشعار عام
            </Button>
          }
        />

        {/* Destructive / Caution Action - Security Settings */}
        <Button
          disabled
          variant="outline"
          className="w-full justify-start gap-3 h-11 px-4 text-sm font-medium border-border hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all duration-300"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-500/10 text-rose-500">
            <ShieldAlert className="size-4" />
          </div>
          إعدادات الحماية والأمان
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
