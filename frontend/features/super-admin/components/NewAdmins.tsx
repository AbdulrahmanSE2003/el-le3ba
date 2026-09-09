import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lock, Shield, UserCog2 } from "lucide-react";
import { getRecentAdmins } from "../api/shared";
import Error from "@/app/error";
import { formatCreatedAt } from "@/lib/utils";
import GenericEmptyState from "@/components/shared/GenericEmptyState";

const NewAdmins = async () => {
  const recentAdminsRes = await getRecentAdmins();
  if (!recentAdminsRes.success) return <Error />;

  const recentAdmins = recentAdminsRes.data.recentAdmins;
  if(!recentAdmins.length) return <GenericEmptyState item="مشرفين" Icon={UserCog2}/>
  

  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6 shadow-sm flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
          <Lock className={`stroke-amber-500 size-5`}/>
          أحدث المسؤولين</h2>
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <Table className={`p-2`}>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-center py-3 text-xs font-semibold text-muted-foreground">
                الاسم
              </TableHead>
              <TableHead className="text-center py-3 text-xs font-semibold text-muted-foreground">
                الإيميل
              </TableHead>
              <TableHead className="text-center py-3 text-xs font-semibold text-muted-foreground">
                الدور
              </TableHead>
              <TableHead className="text-center py-3 text-xs font-semibold text-muted-foreground">
                تاريخ الإنضمام
              </TableHead>
              <TableHead className="text-center py-3 text-xs font-semibold text-muted-foreground">
                آخر تسجيل دخول
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAdmins.map((admin) => (
              <TableRow
                key={admin._id}
                className="transition-colors hover:bg-muted/30 text-center"
              >
                <TableCell className="font-medium text-foreground py-3.5 px-3 text-sm">
                  {admin.name}
                </TableCell>
                <TableCell className="font-medium text-foreground py-3.5 px-3 text-sm">
                  {admin.email}
                </TableCell>
                <TableCell className="py-3.5 px-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary capitalize">
                    <Shield className="h-3 w-3" />
                    {admin.role}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground py-3.5 px-3 text-xs">
                  {formatCreatedAt(admin.createdAt)}
                </TableCell>
                <TableCell className="text-muted-foreground py-3.5 px-3 text-xs">
                  {admin?.lastLoginAt
                    ? formatCreatedAt(admin.lastLoginAt)
                    : "--"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NewAdmins;
