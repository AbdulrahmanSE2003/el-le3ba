import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AdminQuestion } from "@/features/admin/types/question";

import TableActions from "./TableActions";

import { formatCreatedAt } from "@/lib/utils";

import NoTableData from "../../shared/NoTableData";
import { Pagination } from "../../shared/Pagination";
import NoPage from "../../shared/NoPage";
import { HeaderCheckbox, RowCheckbox } from "../../shared/TableCheckbox";

interface Props {
  tableHeaders: string[];
  questions: AdminQuestion[];
  page: number;
  totalPages: number;
}

export default function QuestionsTable({
  tableHeaders,
  questions,
  page,
  totalPages,
}: Props) {
  // No questions page
  if (page > totalPages) {
    return <NoPage requestedPage={page} totalPages={totalPages} />;
  }

  const allIds = questions.map((question) => question._id);

  return (
    <div className="rounded-lg space-y-4">
      <div className="p-5 bg-white dark:bg-card rounded-lg">
        <Table className="text-center">
          {/* Table Headers */}
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border">
              {/* Bulk-selection header checkbox */}
              <TableHead className="w-12 text-center">
                <HeaderCheckbox allIds={allIds} />
              </TableHead>

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
            {/* No notifications to display */}
            {questions.length === 0 && (
              <NoTableData colSpan={7} title="اسئلة" />
            )}

            {/* Questions rows */}
            {questions.map((question) => (
              <TableRow
                key={question._id}
                className="border-border hover:bg-muted/30 transition-colors"
              >
                {/* Row selection checkbox */}
                <TableCell className="text-center">
                  <RowCheckbox id={question._id} />
                </TableCell>

                {/* Question text */}
                <TableCell className="text-right max-w-[260px]">
                  <p className="text-xs font-medium text-foreground truncate">
                    {question.question}
                  </p>
                </TableCell>

                {/* Type */}
                <TableCell>{question.type}</TableCell>

                {/* Category */}
                <TableCell className="text-xs text-muted-foreground">
                  {question.category}
                </TableCell>

                {/* Correct answer */}
                <TableCell className="text-xs font-semibold text-foreground">
                  {question.correctAnswer}
                </TableCell>

                {/* Date of creating */}
                <TableCell className="text-xs font-semibold text-foreground">
                  {formatCreatedAt(question.createdAt)}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <TableActions question={question} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
