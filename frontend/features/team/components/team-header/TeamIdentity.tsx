import { formatDate } from "@/components/shared/formatted-date";

import Captain from "./Captain";

import { Calendar } from "lucide-react";

export default function TeamIdentity({ teamId }: { teamId: string }) {
  const formattedDate = formatDate();

  return (
    <div className="flex flex-col gap-3 w-full lg:w-auto">
      <div className="flex items-center flex-wrap gap-3">
        <h1 className="font-extrabold text-3xl md:text-4xl text-foreground tracking-tight">
          {teamId}
        </h1>

        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-black rounded-full border border-primary/25">
          فريقي 🤝
        </span>

        <Captain />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          تأسس في {formattedDate}
        </span>
      </div>
    </div>
  );
}
