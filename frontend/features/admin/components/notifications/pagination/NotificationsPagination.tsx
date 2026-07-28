import { Button } from "@/components/ui/button";

import { paginationBtns } from "../constants/constants";

export function NotificationsPagination() {
  return (
    <div className="flex items-center justify-center p-4 bg-white dark:bg-card border border-border rounded-xl shadow-sm text-sm">
      {paginationBtns.map((btn) => (
        <Button
          key={btn.title}
          variant="outline"
          size="icon"
          className="h-8 w-8 mx-2"
          title={btn.title}
        >
          {btn.icon ? <btn.icon className="w-4 h-4" /> : <span>1</span>}
        </Button>
      ))}
    </div>
  );
}
