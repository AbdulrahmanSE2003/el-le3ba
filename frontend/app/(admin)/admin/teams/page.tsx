import { ShieldPlus, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TeamsKpiCards } from "@/features/admin/components/teams/TeamsKpiCards";
import { DataTablePagination } from "@/features/admin/components/shared/DataTablePagination";
import { GenericFilterBar } from "@/features/admin/components/shared/GenericFilterBar";
import { ServerTable } from "@/features/admin/components/shared/ServerTable";
import { TeamActionsMenu } from "@/features/admin/components/teams/TeamActionsMenu";
import { FilterConfig, Column } from "@/features/admin/types/shared";
import { Team } from "@/features/admin/types/teams";
import { getTeamsData } from "@/features/admin/api/shared";
import {
  HeaderCheckbox,
  RowCheckbox,
  TableSelectionProvider,
} from "@/features/admin/components/shared/TableCheckbox";
import PageHeader from "@/features/admin/components/shared/PageHeader";

// Filters & Sorting
const teamFilters: FilterConfig[] = [
  {
    key: "status",
    placeholder: "فلتر حسب الحالة",
    options: [
      { value: "all", label: "كل الحالات" },
      { value: "Full", label: "مكتمل (Full)" },
      { value: "Open", label: "شاغر (Open)" },
      { value: "Inactive", label: "معطل (Inactive)" },
    ],
  },
];

const teamSortOptions = [
  { value: "default", label: "الافتراضي" },
  { value: "alphabetical", label: "ترتيب أبجدي" },
  { value: "points", label: "ترتيب بالنقط" },
  { value: "members", label: "الأكثر أعضاءً" },
];

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
    sortBy = "default",
  } = await searchParams;

  const allTeams = getTeamsData;

  const filteredTeams = allTeams
    .filter((team) => {
      const matchesSearch =
        team.name.toLowerCase().includes(search.toLowerCase()) ||
        team.code.toLowerCase().includes(search.toLowerCase()) ||
        team.leaderName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || team.status === status;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
      if (sortBy === "points") return b.points - a.points;
      if (sortBy === "members") return b.membersCount - a.membersCount;
      return 0;
    });

  const currentPage = Number(page);
  const currentLimit = Number(limit);
  const totalResults = filteredTeams.length;
  const totalPages = Math.ceil(totalResults / currentLimit) || 1;
  const paginatedTeams = filteredTeams.slice(
    (currentPage - 1) * currentLimit,
    currentPage * currentLimit,
  );
  const allTeamIds = paginatedTeams.map((t) => t._id);

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
          <p className="font-semibold text-xs text-foreground">{team.name}</p>
          <p className="text-xs text-muted-foreground">{team.code}</p>
        </div>
      ),
    },
    {
      header: "الكابتن",
      cell: (team) => (
        <div>
          <p className="font-medium text-xs text-foreground">
            {team.leaderName}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {team.leaderEmail}
          </p>
        </div>
      ),
    },
    {
      header: "عدد الأعضاء",
      cell: (team) => (
        <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
          <Users className="w-3.5 h-3.5 text-muted-foreground" />
          <span>
            {team.membersCount} / {team.maxMembers}
          </span>
        </div>
      ),
    },
    {
      header: "الحالة",
      cell: (team) => (
        <Badge
          className={
            team.status === "Full"
              ? "bg-brand-success/15 text-brand-success border-none flex items-center w-max gap-1.5"
              : team.status === "Open"
                ? "bg-primary/15 text-primary border-none flex items-center w-max gap-1.5"
                : "bg-destructive/15 text-destructive border-none flex items-center w-max gap-1.5"
          }
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              team.status === "Full"
                ? "bg-brand-success"
                : team.status === "Open"
                  ? "bg-primary"
                  : "bg-destructive"
            }`}
          />
          {team.status === "Full"
            ? "مكتمل"
            : team.status === "Open"
              ? "شاغر"
              : "معطل"}
        </Badge>
      ),
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
        <span className="text-xs text-muted-foreground">{team.createdAt}</span>
      ),
    },
    {
      header: "الإجراءات",
      className: "text-center",
      cell: (team) => (
        <TeamActionsMenu
          teamId={team._id}
          // onViewMembers={(id) => {
          //   // هنا تقدر تفتح الـ Modal/Sheet بتاعة الأعضاء مستقبلاً
          //   console.log("Viewing members for team:", id);
          // }}
        />
      ),
    },
  ];

  return (
    <div className="p-6 space-y-8 dir-rtl text-right font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
        <PageHeader
          title="إدارة الفرق"
          description="قم بإدارة الفرق ومتابعة أعضائها وحالاتها بفعالية"
        />
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-md">
          <ShieldPlus className="w-4 h-4" /> إنشاء فريق جديد +
        </Button>
      </div>

      <TeamsKpiCards />

      <div className="space-y-4">
        {/* Filters & Sorting */}
        <GenericFilterBar
          searchPlaceholder="بحث باسم الفريق، الكود، أو القائد..."
          filters={teamFilters}
          sortOptions={teamSortOptions}
        />

        {/* Table */}
        <TableSelectionProvider>
          <ServerTable
            columns={columns}
            data={paginatedTeams}
            emptyMessage="لا توجد فرق مطابقة للبحث..."
          />
        </TableSelectionProvider>

        {/* Pagination */}
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
