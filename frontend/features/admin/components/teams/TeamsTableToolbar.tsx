"use client";

import { useTableSelection } from "@/features/admin/components/shared/TableCheckbox";
import { BulkDeactivateTeamsModal } from "@/features/admin/components/teams/BulkDeactivateTeamsModal";
import SearchBar from "@/components/shared/SearchBar";
import DataFilter from "@/components/shared/DataFilter";
import SortSelect from "@/components/shared/SortSelect";

export function TeamsTableToolbar() {
  const { selectedIds, clearSelection } = useTableSelection();

  return (
    <>
      <div className="flex max-sm:flex-col gap-3 items-center justify-between">
        <SearchBar placeholder="أبحث عن فريق..." />

        <div className="flex max-sm:flex-col max-sm:w-full items-center gap-3">
          <DataFilter
            queryKey="status"
            placeholder="الحالة"
            label="حالة الفريق"
            options={[
              { value: "full", label: "مكتمل" },
              { value: "open", label: "شاغر" },
              { value: "inactive", label: "معطل" },
            ]}
          />

          <SortSelect
            placeholder="ترتيب الفرق"
            label="ترتيب حسب"
            options={[
              { value: "newest", label: "الأحدث" },
              { value: "oldest", label: "الأقدم" },
              { value: "nameAsc", label: "اسم الفريق (أ - ي)" },
              { value: "nameDesc", label: "اسم الفريق (ي - أ)" },
              { value: "pointsDesc", label: "الأعلى نقاطًا" },
              { value: "pointsAsc", label: "الأقل نقاطًا" },
            ]}
          />
        </div>
      </div>

      <div className="space-y-3">
        <BulkDeactivateTeamsModal
          selectedTeamIds={selectedIds}
          onSuccessClearSelection={clearSelection}
          cancelSelection={clearSelection}
        />
      </div>
    </>
  );
}