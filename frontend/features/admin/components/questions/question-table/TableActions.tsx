import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { MoreVertical } from "lucide-react";

import { AdminQuestion } from "@/features/admin/types/question";
import { ViewQuestionModal } from "../question-modals/show-details-modal/ViewQuestionModal";
import { EditQuestionModal } from "../question-modals/edit-modal/EditQuestionModal";
import { DeleteQuestionModal } from "../question-modals/delete-modal/DeleteQuestionModal";

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
        <ViewQuestionModal question={question} />

        {/* Edit question */}
        <EditQuestionModal question={question} />

        <DropdownMenuSeparator />

        {/* Delete question */}
        <DeleteQuestionModal question={question} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

