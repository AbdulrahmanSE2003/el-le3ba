"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, RotateCcw } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import createPageUrl from "@/features/admin/components/shared/utils/createPageUrl";

interface SortOption {
  label: string;
  value: string;
}

interface SortSelectProps {
  placeholder?: string;
  label?: string;
  options: SortOption[];
  showReset?: boolean;
}

export default function SortSelect({
  placeholder = "ترتيب",
  label = "ترتيب حسب",
  options,
  showReset,
}: SortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "";

  const handleChange = (value: string) => {
    const url = createPageUrl(
      "sort",
      value === "default" ? undefined : value,
      searchParams.toString(),
    );

    router.push(`${pathname}${url}`);
  };

  const handleReset = () => {
    const url = createPageUrl("sort", undefined, searchParams.toString());

    router.push(`${pathname}${url}`);
  };

  return (
    <div className="flex items-center max-sm:items-end gap-3 max-sm:w-full">
      <Select value={currentSort || "default"} onValueChange={handleChange}>
        <SelectTrigger className="min-w-44 bg-card max-sm:w-full">
          <ArrowUpDown className="h-4 w-4" />
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent position="popper" align="start">
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>

            <SelectItem value="default">الافتراضي</SelectItem>

            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {showReset && (
        <Button
          variant="outline"
          className="bg-card/75 hover:bg-card"
          onClick={handleReset}
          disabled={!currentSort}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
