"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import createPageUrl from "@/features/admin/components/shared/utils/createPageUrl";

interface CustomPaginationProps {
  totalPages: number;
  totalItems: number;
  limit: number;
  className?: string;
  showLimitSelect?: boolean;
  limitOptions?: number[];
}

export function CustomPagination({
  totalPages,
  totalItems,
  limit,
  className,
  showLimitSelect = false,
  limitOptions = [5, 10, 20, 50],
}: CustomPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? "1");
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;

  const endItem = Math.min(currentPage * limit, totalItems);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    const url = createPageUrl("page", page.toString(), searchParams.toString());

    router.push(`${pathname}${url}`);
  };

  const changeLimit = (value: string) => {
    const url = createPageUrl("limit", value, searchParams.toString());

    router.push(`${pathname}${url}`);
  };

  const pageSizeOptions = Array.from(new Set([...limitOptions, limit]));

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 0) {
    return null;
  }

  return (
    <div
      className={`flex flex-col-reverse gap-4 px-6 sm:flex-row-reverse items-center sm:justify-between ${className ?? ""}`}
    >
      <div className={`flex items-center gap-3`}>
        {showLimitSelect && (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm text-muted-foreground">
              عرض
            </span>
            <Select value={String(limit)} onValueChange={changeLimit}>
              <SelectTrigger className="w-18 bg-card">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent position="popper" align="start">
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <Pagination className={`sm:justify-end`}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text="السابق"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changePage(currentPage - 1);
                }}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
        
            {getPageNumbers().map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      changePage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
        
            <PaginationItem>
              <PaginationNext
                text="التالي"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changePage(currentPage + 1);
                }}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      

     

        <div className="whitespace-nowrap text-sm text-muted-foreground">
          عرض{" "}
          <span className="font-medium text-foreground">
            {startItem}-{endItem}
          </span>{" "}
          من <span className="font-medium text-foreground">{totalItems}</span>{" "}
          نتيجة
        </div>
    </div>
  );
}
