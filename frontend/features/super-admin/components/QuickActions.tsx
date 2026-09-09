import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SendNotification from "@/features/admin/components/notifications/send-notification/SendNotification";
import { FileText, UserPlus, BellRing, ShieldAlert, Zap, FileBarChartIcon, ClipboardList, CalendarClock, CalendarDaysIcon } from "lucide-react";
import AddAdmin from "./admins/AddAdmin";
import Link from "next/link";
import CreateSeasonModal from "@/features/admin/components/seasons/CreateSeasonModal";
import CreateEventModal from "@/features/admin/components/events/CreateEventModal";

const QuickActions = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
        <Zap className={`stroke-amber-500 size-5`}/>
        إجراءات سريعة</h2>
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
        {/* Secondary Action - Create Report */}
        <Button
          disabled
          className="w-full bg-teal-500/15 text-foreground justify-start gap-3 h-11 px-4 text-sm font-medium border-border hover:bg-accent/30 transition-all duration-300"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-500/30 text-teal-500 ">
            <FileBarChartIcon className="size-4" />
          </div>
          إنشاء تقارير
        </Button>
        {/* Secondary Action - Audit Logs */}
        <Link
          href={'/super-admin/logs'}
          className="w-full rounded-md bg-accent/10 flex items-center text-foreground justify-start gap-3 h-11 px-4 text-sm font-medium border-border hover:bg-accent/30 transition-all duration-300"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/20 text-amber-400">
            <ClipboardList className="size-4" />
          </div>
          عرض سجلات المراجعة
        </Link>
        

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
{/* Action - Create Season */}
        <CreateSeasonModal trigger={
          <Button className="w-full bg-indigo-500/10 text-foreground justify-start gap-3 h-11 px-4 text-sm font-medium border-border hover:bg-indigo-500/20 transition-all duration-300">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-500">
                <CalendarClock className="size-4" />
              </div>
              إنشاء موسم
            </Button>
        }/>
{/* Action - Create Event */}
        <CreateEventModal trigger={
          <Button className="w-full bg-taupe-500/10 text-foreground justify-start gap-3 h-11 px-4 text-sm font-medium border-border hover:bg-taupe-500/20 transition-all duration-300">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-taupe-500/10 text-taupe-500">
                <CalendarDaysIcon className="size-4" />
              </div>
              إنشاء حدث
            </Button>
        }/>

      </div>
    </div>
  );
};

export default QuickActions;
