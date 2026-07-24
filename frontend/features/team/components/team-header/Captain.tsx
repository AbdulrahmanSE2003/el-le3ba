import { Crown } from "lucide-react";

export default function Captain({ role }: { role: "captain" | "member" }) {
  return (
    <span className="text-xs px-3 py-2 bg-accent/20 text-accent-foreground font-black rounded-full border border-accent/25">
      <span className="flex items-center gap-2">
        {role === "captain" && <Crown className="w-3.5 h-3.5 text-yellow-500" />}
        {role === "captain" ? "كابتن" : "عضو"}
      </span>
    </span>
  );
}
