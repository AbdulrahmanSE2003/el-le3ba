"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface SeasonDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: Date;
}

const toDateString = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
};

const parseDateString = (value: string): Date | undefined => {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
};

const formatDate = (value: string): string => {
  const date = parseDateString(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export function SeasonDatePicker({
  value,
  onChange,
  placeholder,
  minDate,
}: SeasonDatePickerProps) {
  const [open, setOpen] = useState(false);

  const selected = parseDateString(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-start gap-2 font-normal",
            !selected && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {selected ? formatDate(value) : (placeholder ?? "اختر التاريخ")}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={selected}
          onSelect={(date) => {
            onChange(date ? toDateString(date) : "");
            setOpen(false);
          }}
          disabled={minDate ? { before: minDate } : undefined}
        />
      </PopoverContent>
    </Popover>
  );
}
