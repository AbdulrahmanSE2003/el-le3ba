"use client";

import { useTableSelection } from "@/features/admin/components/shared/TableCheckbox";
import { BulkDeactivateUsersModal } from "@/features/admin/components/users/BulkDeactivateUsersModal";
import { GenericFilterBar } from "../shared/GenericFilterBar";
import { FilterConfig } from "../../types/shared";

export function UsersTableToolbar() {
  const userFilters: FilterConfig[] = [
    {
      key: "role",
      placeholder: "فلتر حسب الدور",
      options: [
        { value: "all", label: "كل الأدوار" },
        { value: "admin", label: "Admin" },
        { value: "student", label: "Player" },
      ],
    },
    {
      key: "hasTeam",
      placeholder: "فلتر حسب الفريق",
      options: [
        { value: "all", label: "الكل" },
        { value: "true", label: "في فريق" },
        { value: "false", label: "بدون فريق" },
      ],
    },
  ];

  const userSortOptions = [
    { value: "-createdAt", label: "الأحدث" },
    { value: "createdAt", label: "الأقدم" },
    { value: "name", label: "الاسم (أبجدي)" },
  ];

  const { selectedIds, clearSelection } = useTableSelection();

  return (
    <div className="space-y-3">
      <GenericFilterBar
        searchPlaceholder="أبحث عن مستخدم..."
        filters={userFilters}
        sortOptions={userSortOptions}
      />

      <BulkDeactivateUsersModal
        selectedUserIds={selectedIds}
        onSuccessClearSelection={clearSelection}
        cancelSelection={clearSelection}
      />
    </div>
  );
}
