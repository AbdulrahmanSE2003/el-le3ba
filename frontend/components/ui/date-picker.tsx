"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  showTime?: boolean;
  disabled?: boolean;
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

const formatDisplayDate = (value: string, showTime: boolean): string => {
  if (showTime) {
    const date = new Date(value);
    if (isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }
  const date = parseDateString(value);
  if (!date) return "";
  return new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const extractTime = (value: string): string => {
  const tIndex = value.indexOf("T");
  if (tIndex === -1) return "00:00";
  return value.slice(tIndex + 1, tIndex + 6);
};

export function DatePicker({
  value,
  onChange,
  placeholder,
  minDate,
  maxDate,
  showTime = false,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const selected = parseDateString(showTime ? value.slice(0, 10) : value);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange("");
      setOpen(false);
      return;
    }

    if (showTime) {
      const time = extractTime(value);
      const offset = date.getTimezoneOffset();
      const local = new Date(date.getTime() - offset * 60000);
      const isoDate = local.toISOString().slice(0, 10);
      onChange(`${isoDate}T${time}`);
      setOpen(false);
    } else {
      onChange(toDateString(date));
      setOpen(false);
    }
  };

  const handleTimeChange = (time: string) => {
    if (!value) return;
    const datePart = value.slice(0, 10);
    onChange(`${datePart}T${time}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start gap-2 font-normal",
            !selected && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {selected
            ? formatDisplayDate(value, showTime)
            : (placeholder ?? "اختر التاريخ")}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={selected}
          onSelect={handleDateSelect}
          disabled={
            minDate && maxDate
              ? { before: minDate, after: maxDate }
              : minDate
                ? { before: minDate }
                : maxDate
                  ? { after: maxDate }
                  : undefined
          }
        />
        {showTime && (
          <div className="border-t p-3">
            <Input
              type="time"
              value={extractTime(value)}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
