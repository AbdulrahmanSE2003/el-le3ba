"use client";

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

interface PaginationProps {
  page: number;
  totalPages: number;
  totalResults: number;
  limit: number;
}

export function SessionsPagination({
  page,
  totalPages,
  totalResults,
  limit,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
      router.push(createPageUrl(newPage));
    }
  };

  const handleLimitChange = (newLimit: string) => {
    router.push(createPageUrl(1, Number(newLimit)));
  };

  const startResult = totalResults === 0 ? 0 : (page - 1) * limit + 1;
  const endResult = Math.min(page * limit, totalResults);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card border border-border rounded-xl shadow-sm text-sm dir-rtl">
      <div className="text-muted-foreground">
        عرض <span className="font-semibold text-foreground">{startResult}</span>{" "}
        - <span className="font-semibold text-foreground">{endResult}</span> من
        إجمالي{" "}
        <span className="font-semibold text-foreground">{totalResults}</span>{" "}
        مباراة
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs whitespace-nowrap">
            لكل صفحة:
          </span>
          <Select value={limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger className="h-8 w-[70px] bg-background">
              <SelectValue placeholder={limit.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs font-medium text-foreground">
          صفحة {page} من {totalPages || 1}
        </div>

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
            disabled={page >= totalPages}
            title="الصفحة التالية"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(totalPages)}
            disabled={page >= totalPages}
            title="الصفحة الأخيرة"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
