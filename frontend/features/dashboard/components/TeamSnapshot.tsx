"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Member, Team } from "@/features/match/types";
import { getInitials } from "@/lib/utils";
import { Copy, CopyCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TeamSnapshot = ({ team, members }: { team: Team; members: Member[] }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timer = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(team.teamCode);
      setIsCopied(true);
      toast.success("تم نسخ كود التيم بنجاح.");
    } catch (err) {
      toast.error("تعذر نسخ الكود.");
      console.error("فشلت عملية النسخ:", err);
    }
  };

  return (
    <div
      className={`border border-primary/35 bg-background rounded-lg p-6 flex justify-between items-center`}
    >
      {/* Right col */}
      <div className={`flex flex-col gap-y-4`}>
        <Link
          href={"/team"}
          className={`text-sm font-bold font-display text-primary hover:underline`}
        >
          إدارة الفريق
        </Link>

        <div className={`flex items-center gap-4`}>
          <span
            className={`bg-muted text-foreground/75 font-semibold tracking-widest rounded-full text-sm border border-primary/25 p-2 py-1`}
          >
            {team.teamCode}
          </span>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className={`flex items-center`}
                onClick={handleCopy}
                aria-label="Copy team code"
              >
                {isCopied ? (
                  <CopyCheck
                    className={`size-4 text-foreground/75 hover:text-foreground transition-colors duration-300`}
                  />
                ) : (
                  <Copy className={`size-4 text-foreground`} />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>نسخ كود التيم</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Left col */}
      <div className={`flex flex-col items-end gap-y-4`}>
        <span className={`font-semibold font-display text-xl`}>فريقك</span>
        <div className={`flex items-center gap-3`}>
          <div className={`flex items-center gap-1`}>
            {members.length > 0 ? (
              <div className="flex items-center flex-row-reverse">
                {members.map((member, idx) => (
                  <Tooltip key={member.userId._id}>
                    <TooltipTrigger asChild>
                      <div
                        className="size-8 rounded-full border-2 border-background bg-primary/10 text-primary font-display font-bold text-xs flex items-center justify-center select-none ring-1 ring-primary/5 transition-transform hover:-translate-y-0.5 hover:z-10 cursor-pointer -ml-2 first:ml-0"
                        style={{ zIndex: members.length - idx }}
                      >
                        {getInitials(member.userId.name)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs font-medium">
                      {member.userId.name}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">
                لا يوجد أعضاء بعد
              </span>
            )}
          </div>
          <span className={`font-bold font-display text-sm`}>
            {team.teamName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamSnapshot;
