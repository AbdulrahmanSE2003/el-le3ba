import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  NotificationCampaignsRes,
  PaginationBtn,
} from "@/features/admin/types/notification";

export function NotificationsPagination({
  campaigns,
}: NotificationCampaignsRes) {
  const { page, totalPages } = campaigns;

  const paginationBtns: PaginationBtn[] = [
    {
      title: "الصفحة الأولى",
      icon: ChevronsRight,
      disabled: page === 1,
    },
    {
      title: "الصفحة السابقة",
      icon: ChevronRight,
      disabled: page === 1,
    },
    {
      title: "رقم الصفحة",
    },
    {
      title: "الصفحة التالية",
      icon: ChevronLeft,
      disabled: page === totalPages,
    },
    {
      title: "الصفحة الأخيرة",
      icon: ChevronsLeft,
      disabled: page === totalPages,
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
          {btn.icon ? <btn.icon className="w-4 h-4" /> : <span>{page}</span>}
        </Button>
      ))}
    </div>
  );
}
