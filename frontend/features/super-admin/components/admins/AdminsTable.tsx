"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Trash2, Ban, Crown, Shield, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CustomPagination } from "../shared/CustomPagination";
import { useState } from "react";

// ─── Role Badge ───
const RoleBadge = ({ role }: { role: string }) => {
  if (role === "superAdmin") {
    return (
      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">
        <Crown className="mr-1 h-3 w-3" />
        سوبر أدمن
      </Badge>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200"
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
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
        نشط
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
      معطل
    </span>
  );
};

const MOCK_ADMINS = [
  {
    id: "1",
    name: "أحمد خالد",
    email: "ahmed@batu.edu.eg",
    role: "superAdmin" as const,
    isActive: true,
    createdAt: "2025-01-15",
    avatar: "AH",
  },
  {
    id: "2",
    name: "سارة محمد",
    email: "sara@batu.edu.eg",
    role: "admin" as const,
    isActive: true,
    createdAt: "2025-03-10",
    avatar: "SM",
  },
  {
    id: "3",
    name: "عمر حسن",
    email: "omar@batu.edu.eg",
    role: "admin" as const,
    isActive: true,
    createdAt: "2025-04-22",
    avatar: "OH",
  },
  {
    id: "4",
    name: "علي رامي",
    email: "ali@batu.edu.eg",
    role: "admin" as const,
    isActive: false,
    createdAt: "2025-05-01",
    avatar: "AR",
  },
  {
    id: "5",
    name: "نور الدين",
    email: "nour@batu.edu.eg",
    role: "admin" as const,
    isActive: true,
    createdAt: "2025-06-12",
    avatar: "ND",
  },
  {
    id: "6",
    name: "ليلى سامي",
    email: "laila@batu.edu.eg",
    role: "admin" as const,
    isActive: false,
    createdAt: "2025-06-20",
    avatar: "LS",
  },
];

const AdminsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={`space-y-4`}>
      <div className="rounded-xl border bg-card shadow-sm">
        <Table className={`text-right`}>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 [&_th]:not-last:text-center [&_th]:px-3">
              <TableHead>#</TableHead>
              <TableHead>المشرف</TableHead>
              <TableHead>الصلاحية</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>تاريخ الإنشاء</TableHead>
              <TableHead className="text-left">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ADMINS.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  لا يوجد مشرفين مطابقين لبحثك
                </TableCell>
              </TableRow>
            ) : (
              MOCK_ADMINS.map((admin, idx) => (
                <TableRow key={admin.id} className={`text-center`}>
                  <TableCell className="font-medium text-muted-foreground">
                    {idx + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                        {admin.avatar}
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
                    {admin.createdAt}
                  </TableCell>
                  <TableCell className="text-left">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="gap-2">
                          <Pencil className="h-4 w-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-amber-600">
                          <Ban className="h-4 w-4" />
                          {admin.isActive ? "تعطيل" : "تفعيل"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        totalItems={MOCK_ADMINS.length}
        totalPages={4}
        limit={10}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminsTable;
