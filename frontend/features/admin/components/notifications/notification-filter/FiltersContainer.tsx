import { RotateCcw } from "lucide-react";

import { notificationsSortBy, notificationTypes } from "../constants/constants";

import { Button } from "@/components/ui/button";

import CustomSelect from "../../shared/CustomSelect";

export default function FiltersContainer() {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
      <CustomSelect placeholder="فلتر حسب النوع" items={notificationTypes} />

      <CustomSelect placeholder="الترتيب" items={notificationsSortBy} />

      <Button
        variant="outline"
        size="icon"
        title="تصفير الفلاتر"
        className="bg-background border-border hover:bg-muted"
      >
        <RotateCcw className="w-4 h-4 text-muted-foreground" />
      </Button>
    </div>
  );
}
