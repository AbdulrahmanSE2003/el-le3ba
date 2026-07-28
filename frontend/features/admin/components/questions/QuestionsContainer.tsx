import PageHeader from "@/features/admin/components/shared/PageHeader";
import { QuestionsKpiCards } from "@/features/admin/components/questions/QuestionsKpiCards";
import { QuestionsPagination } from "@/features/admin/components/questions/pagination/QuestionsPagination";
import QuestionFilter from "./question-filter/QuestionFilter";
import QuestionsTable from "./question-table/QuestionsTable";

import { questionsTable } from "./constants/constants";

export default async function QuestionsContainer() {
  return (
    <div className="p-3 space-y-6 dir-rtl text-right font-body">
      <PageHeader
        title="الأسئلة"
        description="إدارة بنك الأسئلة المستخدم في كل المباريات والمواسم."
      />

      <QuestionsKpiCards />

      <div className="space-y-4">
        <QuestionFilter />

        <QuestionsTable
          tableHeaders={questionsTable.tableHeaders}
          questions={questionsTable.questions}
        />

        <QuestionsPagination />
      </div>
    </div>
  );
}
