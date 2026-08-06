"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Trash2, Ban, MoreVertical } from "lucide-react";

const TableActions = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="text-left">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem className="gap-2">
            <Pencil className="h-4 w-4" />
            تعديل
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-amber-600">
            <Ban className="h-4 w-4" />
            {isActive ? "تعطيل" : "تفعيل"}
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
            <Trash2 className="h-4 w-4" />
            حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableActions;
