"use client";

import { Edit2, LogOut, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  myRole: "captain" | "member";
  onRenameClick: () => void;
  onDeleteClick: () => void;
  onLeaveClick: () => void;
}

export default function TeamActions({
  myRole,
  onRenameClick,
  onDeleteClick,
  onLeaveClick,
}: Props) {
  const isCaptain = myRole === "captain";

  return (
    <div className="flex items-center justify-end gap-2 flex-wrap">
      {/* Captain Rename Action */}
      {isCaptain && (
        <Button
          type="button"
          onClick={onRenameClick}
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 rounded-xl"
        >
          <Edit2 className="w-4 h-4" />
          <span className="hidden sm:inline">تعديل الاسم</span>
        </Button>
      )}

      {/* Leave Team Action */}
      <Button
        type="button"
        onClick={onLeaveClick}
        variant="outline"
        size="sm"
        className="flex items-center gap-1.5 text-amber-500 hover:text-amber-600 hover:bg-amber-500/10 rounded-xl"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">مغادرة الفريق</span>
      </Button>

      {/* Captain Delete Action */}
      {isCaptain && (
        <Button
          type="button"
          onClick={onDeleteClick}
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-xl"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">حذف الفريق</span>
        </Button>
      )}
    </div>
  );
}
