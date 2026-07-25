"use client";

import Motion from "@/components/shared/Motion";
import { RotateCw } from "lucide-react";
import { fadeInUp } from "@/components/shared/animations";
import { useTransition } from "react";
import { toast } from "sonner";
const LeaderboardHeader = ({
  refreshAction,
}: {
  refreshAction: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    if (refreshAction) {
      startTransition(async () => {
        try {
          await refreshAction();
          setTimeout(() => {
            toast.success("تم تحديث لوحة المتصدرين بنجاح");
          }, 1500);
        } catch (error) {
          console.log(error);

          toast.error("حدث خطأ أثناء التحديث");
        }
      });
    }
  };
  return (
    <div className="max-w-4xl mx-auto flex items-center justify-between mb-10">
      <Motion
        as="div"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="space-y-1"
      >
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            المتصدرون
          </h1>
          <span className="inline-flex items-center rounded-full bg-brand-success/10 px-2.5 py-0.5 text-xs font-bold text-brand-success border border-brand-success/20 animate-pulse">
            نشط
          </span>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground font-medium">
          بطولة يوليو الكبرى
        </p>
      </Motion>

      {/* Refresh Action Trigger */}
      <button
        onClick={handleRefresh}
        disabled={isPending}
        className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-muted-foreground hover:text-brand transition-colors disabled:opacity-50"
      >
        <RotateCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
        {isPending ? "جاري التحديث..." : "تحديث"}
      </button>
    </div>
  );
};

export default LeaderboardHeader;
