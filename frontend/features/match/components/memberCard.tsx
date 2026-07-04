"use client";

import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import type { PresenceMember } from "@/lib/socket";

interface MemberCardProps {
  member: PresenceMember;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const { user } = useUserStore();
  const isCurrentUser = user?._id === member.userId;

  return (
    <div
      className={
        "bg-white dark:bg-zinc-900/50 text-foreground border rounded-lg " +
        "flex flex-col items-center gap-y-2 p-2 py-3 relative " +
        (member.role === "captain" ? "border-accent" : "border-border")
      }
    >
      {/* Avatar */}
      <div
        className={
          "bg-primary/30 border border-primary/50 w-12 h-12 rounded-full " +
          "text-foreground/80 flex items-center justify-center overflow-hidden"
        }
      >
        {member.avatar ? (
          <Image
            src={member.avatar}
            alt={`${member.name} avatar`}
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <span className="text-lg font-semibold">
            {member.name?.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Online Status Indicator */}
      <div
        className={`absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-background ${
          member.isOnline ? "bg-green-500" : "bg-gray-400"
        }`}
      />

      {/* Name */}
      <p className="text-sm font-medium capitalize">
        {member.name?.charAt(0)?.toUpperCase() + member.name?.slice(1)}{" "}
        {isCurrentUser ? "(أنت)" : ""}
      </p>

      {/* Captain Badge */}
      {member.role === "captain" && (
        <span
          className={
            "bg-accent/30 border border-accent text-amber-500 " +
            "dark:text-amber-300 text-xs px-2 rounded-full"
          }
        >
          كابتن
        </span>
      )}
    </div>
  );
};

export default MemberCard;
