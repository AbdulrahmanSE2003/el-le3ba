"use client";

import Image from "next/image";
import { memo } from "react";
import { useUserStore } from "@/store/userStore";
import type { PresenceMember } from "@/features/match/lib/socket";
import { cn } from "@/lib/utils";

interface MemberCardProps {
  member: PresenceMember;
}

const MemberCard = memo(function MemberCard({ member }: MemberCardProps) {
  const { user } = useUserStore();
  const isCurrentUser = user?._id === member.userId;

  return (
    <div
      className={cn(
        "bg-white dark:bg-zinc-900/50 text-foreground border rounded-lg ",
        "flex flex-col items-center gap-y-2 p-2 py-3 relative border-border",
        // member.role === "captain" ? "border-accent" : "border-border",
      )}
    >
      <div
        className={
          "bg-primary/30 border border-primary/50 w-14 h-14 rounded-full " +
          "text-foreground/80 flex items-center justify-center overflow-hidden relative border-2 border-primary"
        }
      >
        {member.avatar ? (
          <Image
            unoptimized
            src={`http://localhost:5000/avatars/${member.avatar}`}
            alt={`${member.name} avatar`}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <span className="text-lg font-semibold">
            {member.name?.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      <div
        className={`absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-background ${
          member.isOnline ? "bg-green-500" : "bg-gray-400"
        }`}
      />

      <p className="text-sm font-medium capitalize">
        {member.name?.charAt(0)?.toUpperCase() + member.name?.slice(1)}{" "}
        {isCurrentUser ? "(أنت)" : ""}
      </p>

      {member.role === "captain" && (
        <span className="bg-accent/30  animate-pulse border border-accent text-amber-500 dark:text-amber-300 text-xs px-2 rounded-full">
          كابتن
        </span>
      )}
    </div>
  );
});

export default MemberCard;
