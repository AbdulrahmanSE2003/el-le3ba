"use client";

import React, { useState } from "react";
import { Crown, MoreVertical, UserMinus, ShieldCheck } from "lucide-react";
import { TeamMember, TeamProfileData } from "../types";
import { AlertModal } from "@/components/shared/AlertModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import StyleContainer from "@/features/profile/components/StyleContainer";
import Motion from "@/components/shared/Motion";
import { fadeInUp, containerVariants } from "@/components/shared/animations";
import api from "@/lib/axios";

interface Props {
  members: TeamMember[];
  team: TeamProfileData;
}

export default function MemberList({ members, team }: Props) {
  const [kickTarget, setKickTarget] = useState<TeamMember | null>(null);
  const [captainTarget, setCaptainTarget] = useState<TeamMember | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();

  const isCaptain = team.viewerRole === "captain";

  const handleKick = async () => {
    if (!kickTarget) return;
    try {
      if (team.isMyTeam) {
        await api.delete(`/teams/${team._id}/members/${kickTarget._id}`);
        toast.success(`تم طرد ${kickTarget.name} من الفريق`);
        router.refresh();
      } else {
        toast.success(`محاكاة: تم طرد ${kickTarget.name}`);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "تعذر طرد العضو");
    }
  };

  const handleTransferCaptain = async () => {
    if (!captainTarget) return;
    try {
      if (team.isMyTeam) {
        await api.patch(`/teams/${team._id}/captain`, {
          newCaptainId: captainTarget._id,
        });
        toast.success(`تم نقل قيادة الفريق إلى ${captainTarget.name}`);
        router.refresh();
      } else {
        toast.success(`محاكاة: تم نقل القيادة إلى ${captainTarget.name}`);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "تعذر نقل القيادة");
    }
  };

  const sortedMembers = [...members].sort((a, b) => {
    if (a.role === "captain") return -1;
    if (b.role === "captain") return 1;
    return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
  });

  return (
    <StyleContainer className="p-6 md:p-8">
      <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
        👥 أعضاء الفريق
        <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {members.length}/5
        </span>
      </h2>

      <Motion
        as="div"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4"
      >
        {sortedMembers.map((member) => {
          const avatarUrl = member.avatar
            ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}/avatars/${member.avatar}`
            : null;

          const joinedDate = new Date(member.joinedAt).toLocaleDateString(
            "ar-EG",
            { year: "numeric", month: "short", day: "numeric" }
          );

          return (
            <Motion
              as="div"
              key={member._id}
              variants={fadeInUp}
              className="relative flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center overflow-hidden border border-border shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-foreground truncate">
                    {member.name}
                  </span>
                  {member.role === "captain" && (
                    <Crown className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  انضم {joinedDate}
                </span>
              </div>

              {/* Captain Actions */}
              {isCaptain && member.role !== "captain" && (
                <div className="absolute top-3 left-3">
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === member._id ? null : member._id
                      )
                    }
                    className="p-1.5 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {openMenu === member._id && (
                    <div className="absolute left-0 top-full mt-1 bg-popover border border-border rounded-xl shadow-lg p-1.5 z-50 min-w-[160px]">
                      <button
                        onClick={() => {
                          setCaptainTarget(member);
                          setOpenMenu(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted text-right transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                        نقل القيادة
                      </button>
                      <button
                        onClick={() => {
                          setKickTarget(member);
                          setOpenMenu(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-500/10 text-red-500 text-right transition"
                      >
                        <UserMinus className="w-4 h-4" />
                        طرد العضو
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Motion>
          );
        })}
      </Motion>

      {/* Kick Confirmation */}
      <AlertModal
        open={!!kickTarget}
        onOpenChange={(open) => !open && setKickTarget(null)}
        title={`طرد ${kickTarget?.name}؟`}
        description="هل أنت متأكد من طرد هذا العضو من الفريق؟ لن يتمكن من المشاركة في المباريات القادمة."
        confirmText="طرد"
        onConfirm={handleKick}
      />

      {/* Transfer Captain Confirmation */}
      <AlertModal
        open={!!captainTarget}
        onOpenChange={(open) => !open && setCaptainTarget(null)}
        title={`نقل القيادة إلى ${captainTarget?.name}؟`}
        description="سيصبح هذا العضو هو كابتن الفريق وستفقد صلاحيات القيادة الحالية."
        confirmText="نقل القيادة"
        onConfirm={handleTransferCaptain}
      />
    </StyleContainer>
  );
}
