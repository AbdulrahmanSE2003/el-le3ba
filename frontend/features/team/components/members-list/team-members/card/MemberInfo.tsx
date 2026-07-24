import { Crown } from "lucide-react";

interface Props {
  name: string;
  joinedDate: string;
  role: string;
}

export default function MemberInfo({ name, joinedDate, role }: Props) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm text-foreground truncate">
          {name}
        </span>
        {role === "captain" && (
          <Crown className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
        )}
      </div>
      <span className="text-xs text-muted-foreground">انضم {joinedDate}</span>
    </div>
  );
}
