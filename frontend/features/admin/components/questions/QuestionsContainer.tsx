import PageHeader from "@/features/admin/components/shared/PageHeader";
import { QuestionsKpiCards } from "@/features/admin/components/questions/QuestionsKpiCards";
import QuestionFilter from "./question-filter/QuestionFilter";
import QuestionsTable from "./question-table/QuestionsTable";
import { QuestionsSelectionBar } from "./question-table/QuestionsSelectionBar";

import { tableHeaders } from "./constants/constants";

import { fetchQuestions } from "../../api/questions";

import Error from "@/app/error";

import StatsCardsSkeleton from "../StatsCardsSkeleton";

import { Suspense } from "react";

import { TableSelectionProvider } from "@/features/admin/components/shared/TableCheckbox";
import { AddQuestionModal } from "./question-modals/add-modal/AddQuestionModal";
import { BulkInsertQuestionsModal } from "./question-modals/bulk-insert-modal/BulkInsertQuestionsModal";

interface Props {
  searchParams: Promise<URLSearchParams>;
}

export default async function QuestionsContainer({ searchParams }: Props) {
  const params = await searchParams;

  const res = await fetchQuestions(params);

  const questions = res.data.questions.questions;
  const page = res.data.questions.pagination.page;
  const totalPages = res.data.questions.pagination.totalPages;

  if (!questions) {
    return <Error />;
  }

  return (
    <div className="p-3 space-y-6 dir-rtl text-right font-body">
      {/* Page header + create/bulk-insert actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="الأسئلة"
          description="إدارة بنك الأسئلة المستخدم في كل المباريات والمواسم."
        />

        <div className="flex items-center gap-2">
          <BulkInsertQuestionsModal />
          <AddQuestionModal />
        </div>
      </div>

      {/* KPI cards */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <QuestionsKpiCards />
      </Suspense>

      {/* Questions table */}
      <Suspense fallback={<div>جاري التحميل...</div>}>
        <TableSelectionProvider>
          <div className="space-y-4">
            <QuestionFilter />

            {/* Only appears once rows are selected */}
            <QuestionsSelectionBar />

            <QuestionsTable
              tableHeaders={tableHeaders}
              questions={questions}
              page={page}
              totalPages={totalPages}
            />
          </div>
        </TableSelectionProvider>
      </Suspense>
    </div>
  );
}
