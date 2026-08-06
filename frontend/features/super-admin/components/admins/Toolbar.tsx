import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchBar from "../shared/SearchBar";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const Toolbar = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <SearchBar placeholder="بحث بالإسم أو الإيميل..." />

      {/* Filter by Role */}
      <div className={`flex items-center gap-3`}>
        <Select>
          <SelectTrigger className={`bg-card`}>
            <SelectValue placeholder="الصلاحية" />
          </SelectTrigger>
          <SelectContent position="popper" align="start">
            <SelectGroup>
              <SelectLabel>الصلاحيات</SelectLabel>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="admin">مشرف</SelectItem>
              <SelectItem value="superAdmin">سوبر أدمن</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Reset Button */}
        <Button variant={"outline"} className={`bg-card/75 hover:bg-card`}>
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
