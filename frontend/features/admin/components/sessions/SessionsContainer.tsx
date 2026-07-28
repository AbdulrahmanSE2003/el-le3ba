import PageHeader from "@/features/admin/components/shared/PageHeader";
import { SessionsKpiCards } from "@/features/admin/components/sessions/SessionsKpiCards";
import { SessionsPagination } from "@/features/admin/components/sessions/pagination/SessionsPagination";
import SessionFilter from "./session-filter/SessionFilter";
import SessionsTable from "./session-table/SessionsTable";

import { sessionsTable } from "./constants/constants";

interface PageProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function SessionsContainer({ searchParams }: PageProps) {
  return (
    <div className="p-3 space-y-6 dir-rtl text-right font-body">
      <PageHeader
        title="المباريات"
        description="متابعة كل المباريات اللي بتتلعب على المنصة، سواء شغالة دلوقتي أو خلصت."
      />

      <SessionsKpiCards />

      <div className="space-y-4">
        <SessionFilter />

        <SessionsTable
          tableHeaders={sessionsTable.tableHeaders}
          sessions={sessionsTable.sessions}
        />

        <SessionsPagination />
      </div>
    </div>
  );
}
