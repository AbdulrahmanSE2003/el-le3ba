import SearchInput from "./SearchInput";
import FiltersContainer from "./FiltersContainer";

export default function SessionFilter() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-5 rounded-lg">
      <SearchInput />

      <FiltersContainer />
    </div>
  );
}
