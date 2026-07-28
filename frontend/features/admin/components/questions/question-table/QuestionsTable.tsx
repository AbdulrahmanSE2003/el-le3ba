import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AdminQuestion } from "@/features/admin/types/question";

import { QuestionTypeBadge } from "./QuestionTypeBadge";
import { QuestionDifficultyBadge } from "./QuestionDifficultyBadge";
import { QuestionStatusBadge } from "./QuestionStatusBadge";
import TableActions from "./TableActions";

interface Props {
  tableHeaders: string[];
  questions: AdminQuestion[];
}

export default function QuestionsTable({ tableHeaders, questions }: Props) {
  return (
    <div className="p-5 bg-white dark:bg-card rounded-lg">
      <Table className="text-center">
        {/* Table Headers */}
        <TableHeader className="bg-muted/50">
          <TableRow className="border-border">
            {tableHeaders.map((header) => (
              <TableHead
                key={header}
                className="font-bold text-foreground py-4 text-center"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {questions.map((question) => (
            <TableRow
              key={question._id}
              className="border-border hover:bg-muted/30 transition-colors"
            >
              {/* Question text */}
              <TableCell className="text-right max-w-[260px]">
                <p className="text-xs font-medium text-foreground truncate">
                  {question.text}
                </p>
              </TableCell>

              {/* Type */}
              <TableCell>
                <QuestionTypeBadge type={question.type} />
              </TableCell>

              {/* Category */}
              <TableCell className="text-xs text-muted-foreground">
                {question.category}
              </TableCell>

              {/* Difficulty */}
              <TableCell>
                <QuestionDifficultyBadge difficulty={question.difficulty} />
              </TableCell>

              {/* Season */}
              <TableCell className="text-xs text-muted-foreground">
                {question.season ?? "عام"}
              </TableCell>

              {/* Usage count */}
              <TableCell className="text-xs font-semibold text-foreground">
                {question.usageCount}
              </TableCell>

              {/* Status */}
              <TableCell>
                <QuestionStatusBadge status={question.status} />
              </TableCell>

              {/* Actions */}
              <TableCell className="text-center">
                <TableActions question={question} />
              </TableCell>
            </TableRow>
          ))}

          {questions.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={tableHeaders.length}
                className="text-center py-8 text-muted-foreground"
              >
                لا يوجد أسئلة مطابقة.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
