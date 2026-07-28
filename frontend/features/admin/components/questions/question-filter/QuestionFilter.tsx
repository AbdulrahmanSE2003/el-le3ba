import SearchInput from "../../shared/SearchInput";
import FiltersContainer from "./FiltersContainer";

export default function QuestionFilter() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-5 rounded-lg">
      <SearchInput placeholder="أبحث في نص السؤال..." />

      <FiltersContainer />
    </div>
  );
}
