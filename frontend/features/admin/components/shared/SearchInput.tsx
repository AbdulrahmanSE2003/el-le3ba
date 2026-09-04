"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search, SearchIcon } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import createPageUrl from "./utils/createPageUrl";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  // Reset the visible value whenever the URL's search param changes (e.g. when
  // the "reset filters" button clears it), without relying on an effect.
  const [prevSearch, setPrevSearch] = useState<string | null>(
    searchParams.get("search"),
  );
  if (prevSearch !== searchParams.get("search")) {
    setPrevSearch(searchParams.get("search"));
    setSearchValue(searchParams.get("search") || "");
  }

  // Search when click on search button
  const handleSearch = () => {
    const url = createPageUrl("search", searchValue, searchParams.toString());
    router.push(`${pathname}${url}`);
  };

  return (
    <form action={handleSearch} className="relative w-full lg:w-96 flex-1">
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
    </form>
  );
}
