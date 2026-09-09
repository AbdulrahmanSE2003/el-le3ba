"use client";

import { useTableSelection } from "@/features/admin/components/shared/TableCheckbox";
import { BulkDeactivateUsersModal } from "@/features/admin/components/users/BulkDeactivateUsersModal";
import SearchBar from "@/components/shared/SearchBar";
import DataFilter from "@/components/shared/DataFilter";
import SortSelect from "@/components/shared/SortSelect";

export function UsersTableToolbar() {
  const { selectedIds, clearSelection } = useTableSelection();

  return (
    <>
      <div className="flex max-sm:flex-col gap-3 items-center justify-between">
        <SearchBar placeholder="أبحث عن مستخدم..." />

        <div className="flex max-sm:flex-col max-sm:w-full items-center gap-3">
          <DataFilter
            queryKey="role"
            placeholder="الدور"
            label="الدور"
            options={[
              { label: "Admin", value: "admin" },
              { label: "Player", value: "student" },
            ]}
          />

          <DataFilter
            queryKey="hasTeam"
            placeholder="الفريق"
            label="حالة الفريق"
            options={[
              { label: "في فريق", value: "true" },
              { label: "بدون فريق", value: "false" },
            ]}
          />

          <SortSelect
            placeholder="ترتيب المستخدمين"
            label="ترتيب حسب"
            options={[
              { value: "-createdAt", label: "الأحدث" },
              { value: "createdAt", label: "الأقدم" },
              { value: "name", label: "الاسم (أبجدي)" },
            ]}
          />
        </div>
      </div>

      <div className="space-y-3">
        <BulkDeactivateUsersModal
          selectedUserIds={selectedIds}
          onSuccessClearSelection={clearSelection}
          cancelSelection={clearSelection}
        />
      </div>
    </>
  );
}