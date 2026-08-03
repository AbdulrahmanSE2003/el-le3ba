"use client";

import { useTableSelection } from "@/features/admin/components/shared/TableCheckbox";
import { GenericFilterBar } from "@/features/admin/components/shared/GenericFilterBar";
import { FilterConfig } from "@/features/admin/types/shared";
import { BulkDeactivateTeamsModal } from "@/features/admin/components/teams/BulkDeactivateTeamsModal";

export function TeamsTableToolbar() {
  const teamFilters: FilterConfig[] = [
    {
      key: "status",
      placeholder: "فلتر حسب الحالة",
      options: [
        { value: "all", label: "كل الحالات" },
        { value: "full", label: "مكتمل" },
        { value: "open", label: "شاغر" },
        { value: "inactive", label: "معطل" },
      ],
    },
  ];

  const teamSortOptions = [
    { value: "newest", label: "الأحدث" },
    { value: "oldest", label: "الأقدم" },
    { value: "nameAsc", label: "اسم الفريق (أ - ي)" },
    { value: "nameDesc", label: "اسم الفريق (ي - أ)" },
    { value: "pointsDesc", label: "الأعلى نقاطًا" },
    { value: "pointsAsc", label: "الأقل نقاطًا" },
  ];

  const { selectedIds, clearSelection } = useTableSelection();

  return (
    <div className="space-y-3">
      <GenericFilterBar
        searchPlaceholder="أبحث عن فريق..."
        filters={teamFilters}
        sortOptions={teamSortOptions}
      />

      <BulkDeactivateTeamsModal
        selectedTeamIds={selectedIds}
        onSuccessClearSelection={clearSelection}
        cancelSelection={clearSelection}
      />
    </div>
  );
}
