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

  return (
    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
      <CustomSelect
        placeholder="فلتر حسب النوع"
        items={notificationTypes}
        value={searchParams.get("type") || "all"}
        onValueChange={(value) => {
          const url = createPageUrl(
            "type",
            value === "all" ? undefined : value,
            searchParams.toString(),
          );
          router.push(`${pathname}${url}`);
        }}
      />

      <CustomSelect
        placeholder="الترتيب"
        items={notificationsSortBy}
        value={searchParams.get("sort") || "latest"}
        onValueChange={(value) => {
          const url = createPageUrl(
            "sort",
            value === "latest" ? undefined : value,
            searchParams.toString(),
          );
          router.push(`${pathname}${url}`);
        }}
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
