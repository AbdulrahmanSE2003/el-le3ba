import { Crown, Trophy, Edit2, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { formatDate } from "@/components/shared/formatted-date";
import StyleContainer from "@/components/shared/StyleContainer";

export default function TeamHeader({ teamName }: { teamName: string }) {
  const formattedDate = formatDate();

  return (
    <StyleContainer className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 md:p-8">
      {/* Team Identity */}
      <div className="flex flex-col gap-3 w-full md:w-auto">
        <div className="flex items-center flex-wrap gap-3">
          <h1 className="font-extrabold text-3xl md:text-4xl text-primary tracking-tight">
            {teamName}
          </h1>

          <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-black rounded-full border border-primary/25">
            فريقي 🤝
          </span>

          {"captain" === "captain" && (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-black rounded-full border border-accent/25">
              <Crown className="w-3.5 h-3.5 text-yellow-500" />
              كابتن
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            تأسس في {formattedDate}
          </span>
        </div>
      </div>

      {/* Rank Standing / Actions */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-border">
        {/* Rank Badge */}

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-500">
            <Trophy size={28} className="drop-shadow" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              الترتيب الحالي
            </p>
            <p className="text-xl font-black text-foreground">المركز 15</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 rounded-xl"
          >
            <Edit2 className="w-4 h-4" />
            <span className="hidden sm:inline">تعديل الاسم</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-xl"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">حذف الفريق</span>
          </Button>
        </div>
      </div>

      {/* Rename Dialog */}
      <Dialog>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-right">تعديل اسم الفريق</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="اسم الفريق الجديد"
              maxLength={20}
              className="text-right rounded-xl"
            />
          </div>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" className="rounded-xl">
              إلغاء
            </Button>
            <Button className="rounded-xl">تأكيد</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-right text-red-500 font-bold">
              تنبيه حذف الفريق
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-right text-sm text-muted-foreground">
            هل أنت متأكد من حذف الفريق بالكامل؟ هذا الإجراء سيقوم بإزالة جميع
            الأعضاء ولن تتمكن من التراجع عن هذه الخطوة.
          </div>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" className="rounded-xl">
              إلغاء
            </Button>
            <Button variant="destructive" className="rounded-xl">
              حذف الفريق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StyleContainer>
  );
}
