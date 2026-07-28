import SearchInput from "../../shared/SearchInput";
import FiltersContainer from "./FiltersContainer";

export default function NotificationFilter() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white dark:bg-card p-5 rounded-lg">
      <SearchInput placeholder="أبحث بعنوان الإشعار..." />

      <FiltersContainer />
    </div>
  );
}
