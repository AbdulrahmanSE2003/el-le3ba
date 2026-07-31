"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { DataTablePaginationProps } from "../../types/users";

interface DataTablePaginationProps {
  page: number;
  totalPages: number;
  totalResults: number;
  limit: number;
  itemLabel: string;
}

export function DataTablePagination({
  page,
  totalPages,
  totalResults,
  limit,
  itemLabel = "عنصر",
}: DataTablePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const createPageUrl = (newPage: number, newLimit?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    if (newLimit) {
      params.set("limit", newLimit.toString());
    }
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      startTransition(() => {
        router.push(createPageUrl(newPage));
      });
    }
  };

  const handleLimitChange = (newLimit: string) => {
    startTransition(() => {
      router.push(createPageUrl(1, Number(newLimit)));
    });
  };

  const startResult = totalResults === 0 ? 0 : (page - 1) * limit + 1;
  const endResult = Math.min(page * limit, totalResults);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card border border-border rounded-xl shadow-sm text-sm dir-rtl">
      {/* Results */}
      <div className="text-muted-foreground text-xs sm:text-sm">
        عرض <span className="font-semibold text-foreground">{startResult}</span>{" "}
        - <span className="font-semibold text-foreground">{endResult}</span> من
        إجمالي{" "}
        <span className="font-semibold text-foreground">{totalResults}</span>{" "}
        {itemLabel}
      </div>

      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
        {/* Change the row number */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs whitespace-nowrap">
            لكل صفحة:
          </span>
          <Select value={limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger className="h-8 w-[70px] bg-background">
              <SelectValue placeholder={limit.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* No. of the page*/}
        <div className="text-xs font-medium text-foreground whitespace-nowrap">
          صفحة {page} من {totalPages || 1}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(1)}
            disabled={page <= 1}
            title="الصفحة الأولى"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            title="الصفحة السابقة"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages || totalPages === 0}
            title="الصفحة التالية"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(totalPages)}
            disabled={page >= totalPages || totalPages === 0}
            title="الصفحة الأخيرة"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
