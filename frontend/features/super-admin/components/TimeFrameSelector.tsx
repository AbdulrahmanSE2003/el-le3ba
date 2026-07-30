"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

const TIMEFRAME_OPTIONS = [
  { label: "اليوم", value: "today" },
  { label: "أمس", value: "yesterday" },
  { label: "آخر 7 أيام", value: "last_7_days" },
  { label: "هذا الشهر", value: "this_month" },
];

const TimeFrameSelector = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("اليوم");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 border-border bg-background px-3 text-xs font-medium border border-accent"
        >
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span>{selectedTimeframe}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          تحديد الفترة الزمنية
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {TIMEFRAME_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setSelectedTimeframe(option.label)}
            className="cursor-pointer text-xs"
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TimeFrameSelector;
