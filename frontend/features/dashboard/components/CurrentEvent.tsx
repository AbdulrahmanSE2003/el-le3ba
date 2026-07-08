import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiServer } from "@/lib/apiServer";
import { User } from "@/store/userStore";
import { Play, Trophy } from "lucide-react";
import Link from "next/link";

interface EventApiResponse {
  status: string;
  event?: {
    _id: string;
    title: string;
    createdBy: string;
    startTime: string;
    endTime: string;
    status: string;
    maxAttempts: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

const getRemainingDays = (endTimeStr: string): number => {
  const diffTime = new Date(endTimeStr).getTime() - Date.now();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const CurrentEvent = async () => {
  const eventRes = await apiServer<EventApiResponse>(
    "get",
    `${process.env.NEXT_PUBLIC_API_URL}/events/current`,
  );

  const event = eventRes?.data?.event;

  if (!event) {
    return (
      <div className="border border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3 bg-muted/30">
        <Trophy className="text-muted-foreground/60 w-10 h-10" />
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-lg">لا توجد بطولات نشطة</h3>
          <p className="text-sm text-muted-foreground">
            انتظر إطلاق البطولة القادمة قريبًا!
          </p>
        </div>
      </div>
    );
  }

  const remainingDays = getRemainingDays(event.endTime);

  return (
    <div className="border border-primary/40 rounded-xl p-6 bg-linear-to-r from-primary/20 to-accent/20 dark:from-primary/10 dark:to-accent/10 flex justify-between items-start gap-4 shadow-xs">
      {/* Right Col */}
      <div className="flex flex-col items-start gap-y-4">
        {/* Badges */}
        <div className="flex items-center gap-1.5">
          <Badge className="py-1 px-2.5 bg-primary/20 text-primary font-bold border-none">
            نشط الآن
          </Badge>
          <Badge
            variant="secondary"
            className="py-1 px-2.5 bg-accent/15 text-amber-400 dark:text-accent font-bold border-none"
          >
            2 / {event.maxAttempts} محاولات متبقية
          </Badge>
        </div>

        {/* Event stats */}
        <div className="flex items-center gap-8 my-1">
          <div className="flex flex-col gap-y-0.5">
            <span className="text-muted-foreground text-xs font-medium">
              عدد الفرق
            </span>
            <span className="text-2xl font-black tracking-tight">235</span>
          </div>
          <div className="flex flex-col gap-y-0.5">
            <span className="text-muted-foreground text-xs font-medium">
              ينتهي خلال
            </span>
            <span className="text-2xl font-black text-amber-400 dark:text-accent tracking-tight">
              {remainingDays === 0 ? "اليوم" : `${remainingDays} يوم`}
            </span>
          </div>
        </div>

        {/* Start button */}
        <Button asChild className="cursor-pointer font-bold gap-2 shadow-md">
          <Link href="/match">
            <Play size={16} fill="currentColor" />
            <span>ادخل اللوبي</span>
          </Link>
        </Button>
      </div>

      {/* Left col */}
      <div className="flex flex-col items-start gap-y-1">
        <span className="text-muted-foreground text-xs font-medium">
          الحدث الحالي
        </span>
        <h3 className="text-xl font-bold text-foreground leading-tight max-w-62.5">
          {event.title}
        </h3>
      </div>
    </div>
  );
};

export default CurrentEvent;
