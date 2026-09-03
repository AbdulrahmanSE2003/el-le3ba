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

import type { Season } from "../../api/seasons";
import { EditSeasonModal } from "./EditSeasonModal";
import { DeleteSeasonModal } from "./DeleteSeasonModal";

export default function SeasonActions({ season }: { season: Season }) {
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

        <EditSeasonModal season={season} />

        <DropdownMenuSeparator />

        <DeleteSeasonModal season={season} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
