import { Trophy, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TeamsKpiCards } from "@/features/admin/components/teams/TeamsKpiCards";
import { DataTablePagination } from "@/features/admin/components/shared/DataTablePagination";
import { ServerTable } from "@/features/admin/components/shared/ServerTable";
import { TeamActionsMenu } from "@/features/admin/components/teams/TeamActionsMenu";
import { Column } from "@/features/admin/types/shared";
import { Team } from "@/features/admin/types/teams";
import { getAllTeams } from "@/features/admin/api/shared";
import {
  HeaderCheckbox,
  RowCheckbox,
  TableSelectionProvider,
} from "@/features/admin/components/shared/TableCheckbox";
import PageHeader from "@/features/admin/components/shared/PageHeader";
import Error from "@/app/error";
import { formatCreatedAt } from "@/lib/utils";
import { TeamsTableToolbar } from "@/features/admin/components/teams/TeamsTableToolbar";
import StatsCardsSkeleton from "@/features/admin/components/StatsCardsSkeleton";
import { Suspense } from "react";
import TeamsTableSkeleton from "@/features/admin/components/teams/TeamsTableSkeleton";

export default async function TeamsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const {
    page = "1",
    limit = "10",
    search = "",
    status = "all",
    sortBy = "newest",
  } = await searchParams;

  const teamsRes = await getAllTeams({
    page: Number(page),
    limit: Number(limit),
    search,

    sort: sortBy,
  });

  if (!teamsRes.success) return <Error />;

  const {
    teams = [],
    totalPages = 1,
    totalResults = 0,
    page: currentPage = Number(page),
    limit: currentLimit = Number(limit),
  } = teamsRes.data.teams;
  const filteredTeams = teams.filter((team) => {
    if (status === "all") return true;

    // حسبة حالة الفريق
    const computedStatus =
      team.membersCount === 0
        ? "inactive"
        : team.membersCount >= 5
          ? "full"
          : "open";

    return computedStatus === status;
  });

  const allTeamIds = filteredTeams.map((team) => team._id);

  const columns: Column<Team>[] = [
    {
      header: <HeaderCheckbox allIds={allTeamIds} />,
      className: "w-12 text-center",
      cell: (team) => <RowCheckbox id={team._id} />,
    },
    {
      header: "بيانات الفريق",
      cell: (team) => (
        <div>
          <p className="font-semibold text-xs text-foreground">
            {team.teamName}
          </p>
          <p className="text-xs text-muted-foreground">{team.teamCode}</p>
        </div>
      ),
    },
    {
      header: "الكابتن",
      cell: (team) => (
        <div>
          <p className="font-medium text-xs text-foreground">
            {team.teamLeader?.name}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {team.teamLeader?.email}
          </p>
        </div>
      ),
    },
    {
      header: "عدد الأعضاء",
      cell: (team) => (
        <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
          <Users className="w-3.5 h-3.5 text-muted-foreground" />
          <span>5 / {team.membersCount}</span>
        </div>
      ),
    },
    {
      header: "الحالة",
      cell: (team) => {
        const teamStatus =
          team.membersCount === 0
            ? "Inactive"
            : team.membersCount >= 5
              ? "Full"
              : "Open";

        return (
          <Badge
            className={
              teamStatus === "Full"
                ? "bg-brand-success/15 text-brand-success border-none flex items-center w-max gap-1.5"
                : teamStatus === "Open"
                  ? "bg-primary/15 text-primary border-none flex items-center w-max gap-1.5"
                  : "bg-destructive/15 text-destructive border-none flex items-center w-max gap-1.5"
            }
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                teamStatus === "Full"
                  ? "bg-brand-success"
                  : teamStatus === "Open"
                    ? "bg-primary"
                    : "bg-destructive"
              }`}
            />
            {teamStatus === "Full"
              ? "مكتمل"
              : teamStatus === "Open"
                ? "شاغر"
                : "معطل"}
          </Badge>
        );
      },
    },
    {
      header: "النقاط",
      cell: (team) => (
        <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
          <Trophy className="w-4 h-4 text-accent" />
          <span>{team.points}</span>
        </div>
      ),
    },
    {
      header: "تاريخ الإنشاء",
      cell: (team) => (
        <span className="text-xs text-muted-foreground">
          {formatCreatedAt(team.createdAt, "ar-EG")}
        </span>
      ),
    },
    {
      header: "الإجراءات",
      className: "text-center",
      cell: (team) => <TeamActionsMenu teamId={team._id} />,
    },
  ];

  return (
    <div className=" space-y-8 dir-rtl text-right font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
        <PageHeader
          title="إدارة الفرق"
          description="قم بإدارة الفرق ومتابعة أعضائها وحالاتها بفعالية"
        />
      </div>
      <Suspense fallback={<StatsCardsSkeleton />}>
        <TeamsKpiCards />
      </Suspense>
      <div className="space-y-4">
        <Suspense fallback={<TeamsTableSkeleton />}>
          <TableSelectionProvider>
            <TeamsTableToolbar />

            <ServerTable
              columns={columns}
              data={filteredTeams}
              emptyMessage="لا توجد فرق مطابقة للبحث..."
            />
          </TableSelectionProvider>
        </Suspense>

        <DataTablePagination
          page={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          limit={currentLimit}
          itemLabel="فريق"
        />
      </div>
    </div>
  );
}
