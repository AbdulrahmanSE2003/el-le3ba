import SearchBar from "@/components/shared/SearchBar";
import DataFilter from "@/components/shared/DataFilter";
import SortSelect from "@/components/shared/SortSelect";

export default function NotificationFilter() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 dark:bg-card rounded-lg">
      <SearchBar placeholder="أبحث بعنوان الإشعار..." />

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
        <DataFilter
          queryKey="targetType"
          placeholder="النوع"
          label="فلتر حسب النوع"
          options={[
            { value: "broadcast", label: "برودكاست" },
            { value: "selected", label: "أشخاص محددين" },
          ]}
        />

        <SortSelect
          placeholder="الترتيب"
          label="ترتيب حسب"
          options={[
            { value: "recent", label: "الأحدث" },
            { value: "oldest", label: "الأقدم" },
            { value: "recipients", label: "الأكثر مستلمين" },
          ]}
        />
      </div>
    </div>
  );
}