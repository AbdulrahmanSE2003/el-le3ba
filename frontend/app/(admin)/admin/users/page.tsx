import { Badge } from "@/components/ui/badge";
import { UsersKpiCards } from "@/features/admin/components/users/UsersKpiCards";
import { DataTablePagination } from "@/features/admin/components/shared/DataTablePagination";
import { ServerTable } from "@/features/admin/components/shared/ServerTable";
import { UserActionsMenu } from "@/features/admin/components/users/UserActionsMenu";
import { Column } from "@/features/admin/types/shared";
import { User } from "@/features/admin/types/users";
import { getAllUsers } from "@/features/admin/api/shared";
import {
  HeaderCheckbox,
  RowCheckbox,
  TableSelectionProvider,
} from "@/features/admin/components/shared/TableCheckbox";
import PageHeader from "@/features/admin/components/shared/PageHeader";
import { Suspense } from "react";
import StatsCardsSkeleton from "@/features/admin/components/StatsCardsSkeleton";
import Error from "@/app/error";
import { formatCreatedAt } from "@/lib/utils";
import UsersTableSkeleton from "@/features/admin/components/users/UsersTableSkeleton";
import { AddUserModal } from "@/features/admin/components/users/AddUserModal";
import { UsersTableToolbar } from "@/features/admin/components/users/UsersTableToolbar";
import CreateReport from "@/components/shared/CreateReport";

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
    hasTeam = "all",
    sortBy = "-createdAt",
  } = await searchParams;

  // Fetch API Data directly from backend
  const usersRes = await getAllUsers({
    page: Number(page),
    limit: Number(limit),
    search,
    role,
    hasTeam,
    sort: sortBy,
  });

  if (!usersRes.success) return <Error />;

  const {
    users = [],
    totalPages = 1,
    totalResults = 0,
    page: currentPage = 1,
    limit: currentLimit = 10,
  } = usersRes.data.users;

  const allUserIds = users.map((u) => u._id);

  const columns: Column<User>[] = [
    {
      header: <HeaderCheckbox allIds={allUserIds} />,
      className: "w-12 text-center",
      cell: (user) => <RowCheckbox id={user._id} />,
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
            user.role === "admin"
              ? "bg-destructive/10 text-destructive border-destructive/20"
              : "bg-primary/10 text-primary border-primary/20"
          }
        >
          {user.role === "admin" ? "أدمن" : "لاعب"}
        </Badge>
      ),
    },
    {
      header: "الحالة",
      cell: (user) => (
        <Badge
          className={
            user.isActive
              ? "bg-brand-success/15 text-brand-success border-none flex items-center w-max gap-1.5"
              : "bg-destructive/15 text-destructive border-none flex items-center w-max gap-1.5"
          }
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-brand-success" : "bg-destructive"}`}
          />
          {user.isActive ? "نشط" : "محظور"}
        </Badge>
      ),
    },

    {
      header: "بيانات التيم",
      cell: (user) =>
        user.team ? (
          <div className="text-xs">
            <span className="font-medium text-foreground">
              {user.team.teamName}
            </span>
            <span dir="rtl" className="text-muted-foreground block text-[11px]">
              #{user.team.teamCode}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground text-xs">-</span>
        ),
    },
    {
      header: "تاريخ الإنشاء",
      cell: (user) =>
        user.createdAt ? (
          <div className="text-xs font-medium text-foreground">
            {formatCreatedAt(user.createdAt, "ar-EG")}
          </div>
        ) : (
          <span className="text-muted-foreground text-xs">-</span>
        ),
    },
    {
      header: "الإجراءات",
      className: "text-center",
      cell: (user) => <UserActionsMenu user={user} />,
    },
  ];

  return (
    <div className=" space-y-8 dir-rtl text-right font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3">
        <PageHeader
          title="إدارة المستخدمين"
          description="قم بإدارة المستخدمين بطريقة فعالة"
        />
        <div className={`flex items-center gap-3`}>
          <CreateReport/>
          <AddUserModal />
        </div>
      </div>
      <Suspense fallback={<StatsCardsSkeleton />}>
        <UsersKpiCards />
      </Suspense>
      <div className="space-y-4">
        {/* Table */}
        <Suspense fallback={<UsersTableSkeleton />}>
          <TableSelectionProvider>
            {/* Filter & Sort & Bulk Deactivate  */}
            <UsersTableToolbar />

            <ServerTable
              columns={columns}
              data={users}
              emptyMessage="لا يوجد مستخدمين..."
            />
          </TableSelectionProvider>
        </Suspense>

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
