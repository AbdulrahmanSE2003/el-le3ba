"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Season } from "../../api/seasons";

const statusLabel: Record<string, string> = {
  active: "نشط",
  upcoming: "قادم",
  knockout: "إقصائيات",
  ended: "منتهي",
};

const SeasonSelector = ({
  seasons,
  selectedSeasonId,
}: {
  seasons: Season[];
  selectedSeasonId?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("seasonId", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">الموسم:</span>
      <Select value={selectedSeasonId} onValueChange={handleChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="اختر الموسم" />
        </SelectTrigger>
        <SelectContent>
          {seasons.map((season) => (
            <SelectItem key={season._id} value={season._id}>
              {season.title} — {statusLabel[season.status] ?? season.status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SeasonSelector;
