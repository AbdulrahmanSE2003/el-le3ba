// features/match/components/memberCard.tsx
"use client";

import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { Member } from "../types";

interface MemberCardProps {
  member: Member;
  isConnected: boolean;
}

const MemberCard = ({ member, isConnected }: MemberCardProps) => {
  const { user } = useUserStore();
  const isCurrentUser = user?._id.toString() === member.userId.toString();

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
        {member.userId.avatar ? (
          <Image
            src={member.userId.avatar}
            alt={`${member.userId.name} avatar`}
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <span className="text-lg font-semibold">
            {member.userId.name?.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Online Status Indicator */}
      <div
        className={`absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-background ${
          isConnected ? "bg-green-500" : "bg-gray-400"
        }`}
      />

      {/* Name */}
      <p className="text-sm font-medium capitalize">
        {member.userId.name?.charAt(0)?.toUpperCase() +
          member.userId.name?.slice(1)}{" "}
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
