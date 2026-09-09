import SearchBar from "@/components/shared/SearchBar";
import SortSelect from "@/components/shared/SortSelect";
import DataFilter from "@/components/shared/DataFilter";

export default function SessionFilter() {
  return (
    <div className="flex max-sm:flex-col gap-3 items-center justify-between">
            <SearchBar placeholder="بحث بإسم الفريق..." />
    
            <div className="flex max-sm:flex-col max-sm:w-full items-center gap-3">
              <DataFilter
                queryKey="status"
                placeholder="الحالة"
                label="حالة الحدث"
                options={[
                  { label: "قادم", value: "scheduled" },
                  { label: "نشط", value: "running" },
                  { label: "منتهي", value: "finished" },
                ]}
              />
    
              <SortSelect
                placeholder="ترتيب الأحداث"
                label="ترتيب الأحداث"
                options={[
                  { label: "الأحدث", value: "-createdAt" },
                  { label: "الأقدم", value: "createdAt" },
                  { label: "وقت البداية - الأقرب", value: "startTime" },
                  { label: "وقت البداية - الأبعد", value: "-startTime" },
                  { label: "وقت النهاية - الأقرب", value: "endTime" },
                  { label: "وقت النهاية - الأبعد", value: "-endTime" },
                  { label: "الاسم تصاعديًا", value: "title" },
                  { label: "الاسم تنازليًا", value: "-title" },
                ]}
              />
            </div>
          </div>
  );
}
