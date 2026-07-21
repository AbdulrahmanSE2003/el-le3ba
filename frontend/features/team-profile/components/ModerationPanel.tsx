"use client";

import { ShieldAlert, RotateCcw, AlertOctagon, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import StyleContainer from "@/features/profile/components/StyleContainer";


export default function ModerationPanel() {
  const handleResetName = () => {
    toast.success("إشراف: تم إعادة تعيين اسم الفريق للافتراضي");
  };

  const handleSuspendTeam = () => {
    toast.success("إشراف: تم حظر الفريق مؤقتاً");
  };

  const handleAdjustPoints = () => {
    toast.success("إشراف: تم فتح لوحة تعديل النقاط");
  };

  return (
    <StyleContainer className="p-6 md:p-8 border-red-500/20 bg-red-500/5">
      <h2 className="text-lg font-bold text-red-600 dark:text-red-400 mb-5 flex items-center gap-2">
        <ShieldAlert className="w-5 h-5" />
        لوحة تحكم المشرف 🛡️
      </h2>

      <p className="text-xs text-muted-foreground mb-4">
        أنت ترى هذه اللوحة لأنك مشرف أو مسؤول عن المنصة. يمكنك اتخاذ الإجراءات
        التالية لتنظيم الفريق:
      </p>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetName}
          className="flex items-center gap-1.5 border-red-200 text-red-600 hover:bg-red-500/10 rounded-xl"
        >
          <RotateCcw className="w-4 h-4" />
          إعادة تعيين الاسم
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleAdjustPoints}
          className="flex items-center gap-1.5 border-red-200 text-red-600 hover:bg-red-500/10 rounded-xl"
        >
          <Edit3 className="w-4 h-4" />
          تعديل النقاط
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={handleSuspendTeam}
          className="flex items-center gap-1.5 rounded-xl"
        >
          <AlertOctagon className="w-4 h-4" />
          حظر مؤقت للفريق
        </Button>
      </div>
    </StyleContainer>
  );
}
