import { Trophy } from "lucide-react";

export default function TeamRank({ rank }: { rank: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 rounded-2xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-500">
        <Trophy size={28} className="drop-shadow" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">
          الترتيب الحالي
        </p>
        <p className="text-xl font-black text-foreground">المركز {rank}</p>
      </div>
    </div>
  );
}
