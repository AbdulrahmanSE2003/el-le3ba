import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative w-full lg:w-96 flex-1">
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pr-9 text-right bg-background dark:placeholder:text-white border-border"
      />
    </div>
  );
}
