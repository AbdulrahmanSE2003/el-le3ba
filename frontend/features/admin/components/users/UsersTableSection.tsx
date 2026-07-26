"use client";

import React, { useState } from "react";
import {
  Search,
  RotateCcw,
  Trophy,
  MoreVertical,
  Edit,
  KeyRound,
  Bell,
  Ban,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/features/admin/types/user";

export function UsersTableSection({ initialUsers }: { initialUsers: User[] }) {
  const [users] = useState<User[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, id]);
    } else {
      setSelectedUsers((prev) => prev.filter((userId) => userId !== id));
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setRoleFilter("all");
    setStatusFilter("all");
    setSortBy("default");
  };

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
      if (sortBy === "points") return b.points - a.points;
      return 0;
    });

  return (
    <div className="space-y-4">
      {/* ── Search & Filter Bar ── */}
      <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 ">
          <div className="relative w-full lg:w-96  flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="أبحث عن مستخدم..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9 text-right bg-background border-border"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end ">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="فلتر حسب الدور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الأدوار</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Player">Player</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="فلتر حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الحالات</SelectItem>
                <SelectItem value="Active">نشط (Active)</SelectItem>
                <SelectItem value="Banned">محظور (Banned)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="الترتيب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">الافتراضي</SelectItem>
                <SelectItem value="alphabetical">ترتيب أبجدي</SelectItem>
                <SelectItem value="points">ترتيب بالنقط</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={handleResetFilters}
              title="تصفير الفلاتر"
              className="bg-background border-border hover:bg-muted"
            >
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table className="text-right ">
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-12 text-center">
                <div className="flex items-center justify-center pr-2">
                  <Checkbox
                    checked={
                      selectedUsers.length === users.length && users.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </div>
              </TableHead>
              <TableHead className="text-right font-bold text-foreground py-4">
                بيانات المستخدم
              </TableHead>
              <TableHead className="text-right font-bold text-foreground  py-4">
                الدور
              </TableHead>
              <TableHead className="text-right font-bold text-foreground  py-4">
                الحالة
              </TableHead>
              <TableHead className="text-right font-bold text-foreground  py-4">
                بيانات التيم
              </TableHead>
              <TableHead className="text-right font-bold text-foreground  py-4">
                النقاط
              </TableHead>
              <TableHead className="text-center font-bold text-foreground  py-4">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  لا يوجد مستخدمين مطابقين للبحث.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-border hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center pr-3">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked: boolean | "indeterminate") =>
                          handleSelectUser(user.id, !!checked)
                        }
                      />
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div>
                      <p className="font-semibold text-xs text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.role === "Admin"
                          ? "bg-destructive/10 text-destructive border-destructive/20 font-medium"
                          : "bg-primary/10 text-primary border-primary/20 font-medium"
                      }
                    >
                      {user.role === "Admin" ? "أدمن" : "لاعب"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={
                        user.status === "Active"
                          ? "bg-brand-success/15 text-brand-success border-none flex items-center w-max gap-1.5"
                          : "bg-destructive/15 text-destructive border-none flex items-center w-max gap-1.5"
                      }
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "Active"
                            ? "bg-brand-success"
                            : "bg-destructive"
                        }`}
                      />
                      {user.status === "Active" ? "نشط" : "محظور"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {user.teamName !== "-" ? (
                      <div className="text-xs">
                        <span className="font-medium text-foreground">
                          {user.teamName}
                        </span>
                        <span className="text-muted-foreground block text-[11px]">
                          {user.teamCode}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                      <Trophy className="w-4 h-4 text-accent" />
                      <span>{user.points}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <DropdownMenu dir="rtl">
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Edit className="w-4 h-4 text-primary" /> تعديل
                          البيانات
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <KeyRound className="w-4 h-4 text-primary" /> إعادة
                          ضبط كلمة السر
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Bell className="w-4 h-4 text-chart-5" /> إرسال إشعار
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer text-destructive dark:text-destructive hover:dark:text-accent-foreground">
                          <Ban className="w-4 h-4" /> حظر
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
    </div>
  );
}
