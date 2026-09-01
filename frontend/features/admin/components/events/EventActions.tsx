"use client";

import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { EventWithSeason } from "@/shared/types/event";
import { EditEventModal } from "./EditEventModal";
import { DeleteEventModal } from "./DeleteEventModal";

interface SeasonOption {
  _id: string;
  title: string;
}

export default function EventActions({
  event,
  seasons,
}: {
  event: EventWithSeason;
  seasons: SeasonOption[];
}) {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <EditEventModal event={event} seasons={seasons} />

        <DropdownMenuSeparator />

        <DeleteEventModal event={event} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
