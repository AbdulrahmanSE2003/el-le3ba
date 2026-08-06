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
import { RotateCcw } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import createPageUrl from "@/features/admin/components/shared/utils/createPageUrl";

interface FilterOption {
  label: string;
  value: string;
}

interface DataFilterProps {
  queryKey: string;
  placeholder: string;
  label?: string;
  options: FilterOption[];
  showReset?: boolean;
}

export default function DataFilter({
  queryKey,
  placeholder,
  label,
  options,
  showReset,
}: DataFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(queryKey) ?? "";

  const handleChange = (value: string) => {
    const url = createPageUrl(
      queryKey,
      value === "all" ? undefined : value,
      searchParams.toString(),
    );

    router.push(`${pathname}${url}`);
  };

  const handleReset = () => {
    const url = createPageUrl(queryKey, undefined, searchParams.toString());

    router.push(`${pathname}${url}`);
  };

  return (
    <div className="flex items-center gap-3">
      <Select value={currentValue || "all"} onValueChange={handleChange}>
        <SelectTrigger className="bg-card min-w-44">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent align="start" position="popper">
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}

            <SelectItem value="all">الكل</SelectItem>

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
          disabled={!currentValue}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
