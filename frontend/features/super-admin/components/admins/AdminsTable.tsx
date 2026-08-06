import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CustomPagination } from "../shared/CustomPagination";
import { getAllAdmins } from "../../api/shared";
import Error from "@/app/error";
import { Crown, Shield } from "lucide-react";
import TableActions from "./TableActions";
import { formatCreatedAt } from "@/lib/utils";

// ─── Role Badge ───
const RoleBadge = ({ role }: { role: string }) => {
  if (role === "superAdmin") {
    return (
      <Badge
        variant="outline"
        className="border-accent bg-accent/10 text-amber-700 hover:bg-accent/20 dark:border-amber-400/30 dark:bg-accent/10 dark:text-accent"
      >
        <Crown className="mr-1 h-3 w-3" />
        سوبر أدمن
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="border-blue-500/30 bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300"
    >
      <Shield className="mr-1 h-3 w-3" />
      مشرف
    </Badge>
  );
};

// ─── Status Badge ───
const StatusBadge = ({ isActive }: { isActive: boolean }) => {
  if (isActive) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-500/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
        نشط
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border dark:bg-muted/50">
      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
      معطل
    </span>
  );
};

const AdminsTable = async () => {
  const adminsRes = await getAllAdmins();
  if (!adminsRes.success) return <Error />;

  const admins = adminsRes.data.admins.admins;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-card shadow-sm">
        <Table className="text-right">
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 [&_th]:text-center">
              <TableHead>#</TableHead>
              <TableHead>المشرف</TableHead>
              <TableHead>الصلاحية</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>تاريخ الإنشاء</TableHead>
              <TableHead>آخر تسجيل دخول</TableHead>
              <TableHead className="text-left">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  لا يوجد مشرفين حاليا...
                </TableCell>
              </TableRow>
            ) : (
              admins.map((admin, idx) => (
                <TableRow key={admin._id} className="text-center">
                  <TableCell className="font-medium text-muted-foreground">
                    {idx + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex uppercase h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold text-primary">
                        {admin.name?.slice(0, 2) || "?"}
                      </div>
                      <div>
                        <p className="font-medium text-right">{admin.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {admin.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={admin.role} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge isActive={admin.isActive} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatCreatedAt(admin.createdAt)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatCreatedAt(admin.lastLoginAt)}
                  </TableCell>
                  <TableCell className="text-left">
                    <TableActions isActive={admin.isActive} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminsTable;
