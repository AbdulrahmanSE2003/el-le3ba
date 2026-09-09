import SearchBar from "@/components/shared/SearchBar";
import DataFilter from "@/components/shared/DataFilter";
import SortSelect from "@/components/shared/SortSelect";

export default function QuestionFilter() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 rounded-lg">
      <SearchBar placeholder="أبحث في نص السؤال..." />

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
        <DataFilter
          queryKey="type"
          placeholder="النوع"
          label="فلتر حسب النوع"
          options={[
            { value: "mcq", label: "اختيار من متعدد" },
            { value: "numberExact", label: "رقم صحيح" },
          ]}
        />

        <DataFilter
          queryKey="category"
          placeholder="الفئة"
          label="فلتر حسب الفئة"
          options={[
            { value: "art", label: "فن" },
            { value: "general", label: "عام" },
            { value: "geography", label: "جغرافيا" },
            { value: "history", label: "تاريخ" },
            { value: "science", label: "علوم" },
            { value: "literature", label: "أدب" },
            { value: "math", label: "رياضيات" },
          ]}
        />

        <SortSelect
          placeholder="الترتيب"
          label="ترتيب حسب"
          options={[
            { value: "newest", label: "الأحدث" },
            { value: "oldest", label: "الأقدم" },
            { value: "durationAsc", label: "الوقت الأقل" },
            { value: "durationDesc", label: "الوقت الأطول" },
            { value: "categoryAsc", label: "الفئة - أ" },
            { value: "categoryDesc", label: "الفئة - ي" },
            { value: "typeAsc", label: "النوع - أ" },
            { value: "typeDesc", label: "النوع - ي" },
          ]}
        />
      </div>
    </div>
  );
}