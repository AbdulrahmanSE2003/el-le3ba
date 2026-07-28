"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  key: string;
  placeholder: string;
  options: FilterOption[];
}

interface GenericFilterBarProps {
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  sortOptions?: FilterOption[];
}

export function GenericFilterBar({
  searchPlaceholder = "بحث...",
  filters = [],
  sortOptions = [],
}: GenericFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (value && value !== "all" && value !== "default") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        updateUrl("search", searchTerm);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleResetFilters = () => {
    setSearchTerm("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  return (
    <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full lg:w-96 flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-9 text-right bg-background border-border"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
          {filters.map((filter) => {
            const currentValue = searchParams.get(filter.key) || "all";
            return (
              <Select
                key={filter.key}
                value={currentValue}
                onValueChange={(val) => updateUrl(filter.key, val)}
              >
                <SelectTrigger className="w-[140px] bg-background">
                  <SelectValue placeholder={filter.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          })}

          {/* Sort (opt)*/}
          {sortOptions.length > 0 && (
            <Select
              value={searchParams.get("sortBy") || "default"}
              onValueChange={(val) => updateUrl("sortBy", val)}
            >
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="الترتيب" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={handleResetFilters}
            title="تصفير الفلاتر"
            className="bg-background border-border hover:bg-muted"
          >
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
