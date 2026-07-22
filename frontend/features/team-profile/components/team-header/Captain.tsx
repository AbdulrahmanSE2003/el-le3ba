import { Crown } from "lucide-react";

export default function Captain() {
  return (
    "captain" === "captain" && (
      <span className="flex items-center gap-1.5 px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-black rounded-full border border-accent/25">
        <Crown className="w-3.5 h-3.5 text-yellow-500" />
        كابتن
      </span>
    )
  );
}
