import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { AdminQuestion } from "@/features/admin/types/question";

import TableActions from "./TableActions";

import { formatCreatedAt } from "@/lib/utils";

import NoTableData from "../../shared/NoTableData";
import { CustomPagination } from "@/features/super-admin/components/shared/CustomPagination";
import NoPage from "../../shared/NoPage";
import { HeaderCheckbox, RowCheckbox } from "../../shared/TableCheckbox";
import { getQuestionTypeStyle } from "@/features/admin/utils/constants";

interface Props {
  tableHeaders: string[];
  questions: AdminQuestion[];
  page: number;
  totalPages: number;
  totalResults: number;
  limit: number;
}


function QuestionTypeBadge({ type }: { type: string }) {
  const { icon: Icon, className, label } = getQuestionTypeStyle(type);

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${className}`}
    >
      <Icon className="size-3.5" />
      <span>{label}</span>
    </Badge>
  );
}

export default function QuestionsTable({
  tableHeaders,
  questions,
  page,
  totalPages,
  totalResults,
  limit,
}: Props) {
  if (page > totalPages) {
    return <NoPage requestedPage={page} totalPages={totalPages} />;
  }

  const allIds = questions.map((question) => question._id);

  return (
    <div className="rounded-lg space-y-4">
      <div className="rounded-lg border border-border overflow-hidden">
        <Table className="text-center">
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border">
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

          <TableBody className="bg-card">
            {questions.length === 0 && (
              <NoTableData colSpan={tableHeaders.length + 1} title="اسئلة" />
            )}

            {questions.map((question) => (
              <TableRow
                key={question._id}
                className="border-border hover:bg-muted/30 transition-colors"
              >
                <TableCell className="text-center">
                  <RowCheckbox id={question._id} />
                </TableCell>

                <TableCell className="max-w-65 truncate text-start">
                  <p className="text-sm font-medium text-foreground truncate" title={question.question}>
                    {question.question}
                  </p>
                </TableCell>

                {/* Type Badge */}
                <TableCell>
  <QuestionTypeBadge type={question.type} />
</TableCell>

                {/* Category Badge */}
                <TableCell>
                  <Badge variant="secondary" className="font-normal capitalize text-xs">
                    {question.category}
                  </Badge>
                </TableCell>

                {/* Correct Answer Highlight */}
                <TableCell>
                  <span className="inline-flex items-center px-3 py-px rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {question.correctAnswer}
                  </span>
                </TableCell>

                <TableCell className="text-xs text-muted-foreground font-medium">
                  {formatCreatedAt(question.createdAt)}
                </TableCell>

                <TableCell className="text-center">
                  <TableActions question={question} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CustomPagination
        className="mt-auto"
        totalItems={totalResults}
        totalPages={totalPages}
        limit={limit}
        showLimitSelect
      />
    </div>
  );
}