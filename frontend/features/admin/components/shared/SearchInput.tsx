"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search, SearchIcon } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import createPageUrl from "./utils/createPageUrl";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  // Search when click on search button
  const handleSearch = () => {
    const url = createPageUrl("search", searchValue, searchParams.toString());
    router.push(`${pathname}${url}`);
  };

  // Reset search when click on reset filters button
  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearchValue("");
    }
  }, [searchParams]);

  return (
    <div className="relative w-full lg:w-96 flex-1">
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pr-9 text-right bg-background dark:placeholder:text-white border-border"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Button onClick={handleSearch} className="absolute left-0">
        <SearchIcon />
      </Button>
    </div>
  );
}
