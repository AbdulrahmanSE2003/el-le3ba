import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  Archive,
  ArchiveRestore,
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import { AdminQuestion } from "@/features/admin/types/question";

interface Props {
  question: AdminQuestion;
}

export default function TableActions({ question }: Props) {
  return (
    <DropdownMenu dir="rtl">
      {/* Trigger button */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      {/* Menu content */}
      <DropdownMenuContent align="end" className="w-52">
        {/* Menu Label */}
        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>

        {/* Separator */}
        <DropdownMenuSeparator />

        {/* View question details */}
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <Eye className="w-4 h-4 text-primary" /> عرض التفاصيل
        </DropdownMenuItem>

        {/* Edit question */}
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <Pencil className="w-4 h-4 text-primary" /> تعديل السؤال
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Archive if active, restore if archived */}
        {question.status === "active" ? (
          <DropdownMenuItem className="gap-2 cursor-pointer text-amber-500 dark:text-amber-500">
            <Archive className="w-4 h-4" /> أرشفة السؤال
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="gap-2 cursor-pointer text-emerald-500 dark:text-emerald-500">
            <ArchiveRestore className="w-4 h-4" /> استعادة السؤال
          </DropdownMenuItem>
        )}

        {/* Permanent delete only when the question is already archived */}
        {question.status === "archived" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive dark:text-destructive hover:dark:text-accent-foreground">
              <Trash2 className="w-4 h-4" /> حذف نهائي
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
