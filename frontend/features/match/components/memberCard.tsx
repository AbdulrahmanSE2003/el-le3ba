import Image from "next/image";
import { Member } from "../types";
import { useUserStore } from "@/store/userStore";

const MemberCard = ({ member }: { member: Member }) => {
  const statusClass = true
    ? "text-brand-success"
    : "text-zinc-600 dark:text-zinc-400";

  const statusLabel = true ? "متصل" : "غير متصل";

  const { user } = useUserStore();
  console.log(`UserId: ${user?._id.toString()}`);
  return (
    <div
      className={
        "bg-white dark:bg-zinc-900/50 text-foreground border rounded-lg " +
        "flex flex-col items-center gap-y-2 p-2 py-3 " +
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
        {member.userId?.avatar ? (
          <Image
            src={member.userId.avatar}
            alt={`${member.userId?.name} avatar`}
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          member.userId?.name?.slice(0, 2).toUpperCase()
        )}
      </div>

      {/* Name */}
      <p className="text-sm font-medium capitalize">
        {member.userId?.name.at(0)?.toUpperCase() +
          member.userId?.name.slice(1)}{" "}
        {user?._id.toString() === member.userId?._id.toString() ? "(أنت)" : ""}
      </p>

      {/* Status */}
      <span className={`text-sm ${statusClass}`}>&bull; {statusLabel}</span>

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
