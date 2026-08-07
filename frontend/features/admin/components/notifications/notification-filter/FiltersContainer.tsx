"use client";

import { RotateCcw } from "lucide-react";

import { notificationsSortBy, notificationTypes } from "../constants/constants";

import { Button } from "@/components/ui/button";

import CustomSelect from "../../shared/CustomSelect";

import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import createPageUrl from "../../shared/utils/createPageUrl";

export default function FiltersContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset all filters when click on reset filters button
  const handleResetFilters = () => {
    redirect("/admin/notifications");
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
        items={notificationTypes}
        value={searchParams.get("targetType") || "all"}
        onValueChange={(value) => handleFilterChange("targetType", value)}
      />

      <CustomSelect
        placeholder="الترتيب"
        items={notificationsSortBy}
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
