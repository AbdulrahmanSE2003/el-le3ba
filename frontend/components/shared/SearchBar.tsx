"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SearchIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import createPageUrl from "@/features/admin/components/shared/utils/createPageUrl";

interface SearchBarProps {
  placeholder: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";

  const [searchValue, setSearchValue] = useState(currentSearch);

  // Keep local state synced with URL
  useEffect(() => {
    const currentSearch = searchParams.get("search");

    if (searchValue === "" && currentSearch) {
      const url = createPageUrl("search", undefined, searchParams.toString());

      router.replace(`${pathname}${url}`);
    }
  }, [searchValue, searchParams, pathname, router]);

  const navigate = (value: string) => {
    const url = createPageUrl(
      "search",
      value.trim() || undefined,
      searchParams.toString(),
    );

    router.push(`${pathname}${url}`);
  };

  const handleSearch = () => {
    if (searchValue.trim() === currentSearch) return;

    navigate(searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");

    if (!currentSearch) return;

    navigate("");
  };

  return (
    <div className="flex flex-1 items-center gap-2">
      <div className="relative w-full lg:w-96">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={searchValue}
          placeholder={placeholder}
          className="pr-9 pl-10 text-right"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }

            if (e.key === "Escape") {
              clearSearch();
            }
          }}
        />

        {searchValue && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <Button
        onClick={handleSearch}
        disabled={searchValue.trim() === currentSearch}
      >
        <SearchIcon className="size-4" />
      </Button>
    </div>
  );
}
