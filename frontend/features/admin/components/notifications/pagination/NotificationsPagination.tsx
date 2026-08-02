"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { PaginationBtn } from "@/features/admin/types/notification";
import createPageUrl from "../../shared/utils/createPageUrl";
import Link from "next/link";

interface Props {
  page: number;
  totalPages: number;
}

export function NotificationsPagination({ page, totalPages }: Props) {
  // Create pagination links
  const prevUrl = createPageUrl("page", page - 1, "");
  const nextUrl = createPageUrl("page", page + 1, "");
  const firstPageUrl = createPageUrl("page", 1, "");
  const lastPageUrl = createPageUrl("page", totalPages, "");

  // Pagination buttons
  const paginationBtns: PaginationBtn[] = [
    {
      title: "الصفحة الأولى",
      icon: ChevronsRight,
      disabled: page === 1,
      url: firstPageUrl,
    },
    {
      title: "الصفحة السابقة",
      icon: ChevronRight,
      disabled: page === 1,
      url: prevUrl,
    },
    {
      title: "رقم الصفحة",
    },
    {
      title: "الصفحة التالية",
      icon: ChevronLeft,
      disabled: page >= totalPages,
      url: nextUrl,
    },
    {
      title: "الصفحة الأخيرة",
      icon: ChevronsLeft,
      disabled: page >= totalPages,
      url: lastPageUrl,
    },
  ];

  return (
    <div className="flex items-center justify-center p-4 bg-white dark:bg-card border border-border rounded-xl shadow-sm text-sm">
      {paginationBtns.map((btn) => (
        <Button
          key={btn.title}
          variant="outline"
          size="icon"
          className={`h-8 w-8 mx-2 ${btn.title === "رقم الصفحة" && "cursor-default"}`}
          title={btn.title}
          disabled={btn.disabled}
        >
          <Link href={btn.disabled ? "" : btn.url || ""}>
            {btn.icon ? <btn.icon className="w-4 h-4" /> : <span>{page}</span>}
          </Link>
        </Button>
      ))}
    </div>
  );
}
