import { Edit2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function TeamActions() {
  return (
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
  );
}
