import { UserPlus, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UsersKpiCards } from "@/features/admin/components/users/UsersKpiCards";
import { DataTablePagination } from "@/features/admin/components/shared/DataTablePagination";
import { GenericFilterBar } from "@/features/admin/components/shared/GenericFilterBar";
import { ServerTable } from "@/features/admin/components/shared/ServerTable";
import { UserActionsMenu } from "@/features/admin/components/users/UserActionsMenu";
import { Column, FilterConfig, User } from "@/features/admin/types/users";
import { getUsersData } from "@/features/admin/api/shared";
import {
  HeaderCheckbox,
  RowCheckbox,
  TableSelectionProvider,
} from "@/features/admin/components/shared/TableCheckbox";
import PageHeader from "@/features/admin/components/shared/PageHeader";

// Filters & Sorting
const userFilters: FilterConfig[] = [
  {
    key: "role",
    placeholder: "فلتر حسب الدور",
    options: [
      { value: "all", label: "كل الأدوار" },
      { value: "Admin", label: "Admin" },
      { value: "Player", label: "Player" },
    ],
  },
  {
    key: "status",
    placeholder: "فلتر حسب الحالة",
    options: [
      { value: "all", label: "كل الحالات" },
      { value: "Active", label: "نشط (Active)" },
      { value: "Banned", label: "محظور (Banned)" },
    ],
  },
];

const userSortOptions = [
  { value: "default", label: "الافتراضي" },
  { value: "alphabetical", label: "ترتيب أبجدي" },
  { value: "points", label: "ترتيب بالنقط" },
];

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const {
    page = "1",
    limit = "10",
    search = "",
    role = "all",
    status = "all",
    sortBy = "default",
  } = await searchParams;

  // const allUsers = await getUsersData();
  const allUsers = getUsersData;

  const filteredUsers = allUsers
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = role === "all" || user.role === role;
      const matchesStatus = status === "all" || user.status === status;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
      if (sortBy === "points") return b.points - a.points;
      return 0;
    });

  const currentPage = Number(page);
  const currentLimit = Number(limit);
  const totalResults = filteredUsers.length;
  const totalPages = Math.ceil(totalResults / currentLimit) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * currentLimit,
    currentPage * currentLimit,
  );
  const allUserIds = paginatedUsers.map((u) => u.id);

  const columns: Column<User>[] = [
    {
      header: <HeaderCheckbox allIds={allUserIds} />,
      className: "w-12 text-center",
      cell: (user) => <RowCheckbox id={user.id} />,
    },
    {
      header: "بيانات المستخدم",
      cell: (user) => (
        <div>
          <p className="font-semibold text-xs text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      ),
    },
    {
      header: "الدور",
      cell: (user) => (
        <Badge
          variant="outline"
          className={
            user.role === "Admin"
              ? "bg-destructive/10 text-destructive border-destructive/20"
              : "bg-primary/10 text-primary border-primary/20"
          }
        >
          {user.role === "Admin" ? "أدمن" : "لاعب"}
        </Badge>
      ),
    },
    {
      header: "الحالة",
      cell: (user) => (
        <Badge
          className={
            user.status === "Active"
              ? "bg-brand-success/15 text-brand-success border-none flex items-center w-max gap-1.5"
              : "bg-destructive/15 text-destructive border-none flex items-center w-max gap-1.5"
          }
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-brand-success" : "bg-destructive"}`}
          />
          {user.status === "Active" ? "نشط" : "محظور"}
        </Badge>
      ),
    },
    {
      header: "بيانات التيم",
      cell: (user) =>
        user.teamName !== "-" ? (
          <div className="text-xs">
            <span className="font-medium text-foreground">{user.teamName}</span>
            <span className="text-muted-foreground block text-[11px]">
              {user.teamCode}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground text-xs">-</span>
        ),
    },
    {
      header: "النقاط",
      cell: (user) => (
        <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
          <Trophy className="w-4 h-4 text-accent" />
          <span>{user.points}</span>
        </div>
      ),
    },
    {
      header: "الإجراءات",
      className: "text-center",
      cell: (user) => <UserActionsMenu userId={user.id} />,
    },
  ];

  return (
    <div className="p-6 space-y-8 dir-rtl text-right font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
        <PageHeader
          title="إدارة المستخدمين"
          description="قم بإدارة المستخدمين بطريقة فعالة"
        />
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-md">
          <UserPlus className="w-4 h-4" /> إضافة مستخدم جديد +
        </Button>
      </div>

      <UsersKpiCards />
      <div className="space-y-4">
        {/* filters & Sorting */}
        <GenericFilterBar
          searchPlaceholder="أبحث عن مستخدم..."
          filters={userFilters}
          sortOptions={userSortOptions}
        />

        {/* Table */}
        <TableSelectionProvider>
          <ServerTable
            columns={columns}
            data={paginatedUsers}
            emptyMessage="لا يوجد مستخدمين..."
          />
        </TableSelectionProvider>

        {/* Pagination */}
        <DataTablePagination
          page={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          limit={currentLimit}
          itemLabel="مستخدم"
        />
      </div>
    </div>
  );
}
