"use client";

import { RotateCcw } from "lucide-react";

import {
  questionCategories,
  questionsSortBy,
  questionTypes,
} from "../constants/constants";

import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Button } from "@/components/ui/button";

import CustomSelect from "../../shared/CustomSelect";
import createPageUrl from "../../shared/utils/createPageUrl";

export default function FiltersContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset all filters when click on reset filters button
  const handleResetFilters = () => {
    redirect("/admin/questions");
  };

  // Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    const url = createPageUrl(key, value, searchParams.toString());
    router.push(`${pathname}${url}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
      <CustomSelect
        placeholder="فلتر حسب النوع"
        items={questionTypes}
        value={searchParams.get("type") || "all"}
        onValueChange={(value) => handleFilterChange("type", value)}
      />

      <CustomSelect
        placeholder="فلتر حسب الفئة"
        items={questionCategories}
        value={searchParams.get("category") || "all"}
        onValueChange={(value) => handleFilterChange("category", value)}
      />

      <CustomSelect
        placeholder="الترتيب"
        items={questionsSortBy}
        value={searchParams.get("sort") || "default"}
        onValueChange={(value) => handleFilterChange("sort", value)}
      />

      <Button
        variant="outline"
        size="icon"
        title="تصفير الفلاتر"
        onClick={handleResetFilters}
        className="bg-background border-border hover:bg-muted"
      >
        <RotateCcw className="w-4 h-4 text-muted-foreground" />
      </Button>
    </div>
  );
}
