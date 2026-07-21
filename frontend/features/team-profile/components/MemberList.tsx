"use client";

import { useState } from "react";
import { Crown, MoreVertical, UserMinus, ShieldCheck } from "lucide-react";
import { TeamMember, TeamProfileData } from "../types";
import { AlertModal } from "@/components/shared/AlertModal";
import StyleContainer from "@/features/profile/components/StyleContainer";
import Motion from "@/components/shared/Motion";
import { fadeInUp, containerVariants } from "@/components/shared/animations";
import { sortedMembers } from "../contants";

interface Props {
  members: TeamMember[];
  team: TeamProfileData;
}

export default function MemberList() {
  const [kickTarget, setKickTarget] = useState<string | null>(null);
  const [captainTarget, setCaptainTarget] = useState<
    TeamMember | null | string
  >(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <StyleContainer className="p-6 md:p-8">
      <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
        👥 أعضاء الفريق
        <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          3/5
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
          const joinedDate = new Date(member.joinedAt).toLocaleDateString(
            "ar-EG",
            { year: "numeric", month: "short", day: "numeric" },
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
                {true ? (
                  <img
                    src={"avatars.avatar1.png"}
                    alt={"Ahmed"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">
                    A
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-foreground truncate">
                    Ahmed
                  </span>
                  {true && (
                    <Crown className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  انضم {joinedDate}
                </span>
              </div>

              {/* Captain Actions */}
              {true && "captain" !== "captain" && (
                <div className="absolute top-3 left-3">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === member._id ? null : member._id)
                    }
                    className="p-1.5 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-foreground"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {openMenu === member._id && (
                    <div className="absolute left-0 top-full mt-1 bg-popover border border-border rounded-xl shadow-lg p-1.5 z-50 min-w-[160px]">
                      <button
                        onClick={() => {
                          setCaptainTarget("احمد");
                          setOpenMenu(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted text-right transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                        نقل القيادة
                      </button>
                      <button
                        onClick={() => {
                          setKickTarget("احمد");
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
        title={`طرد احمد؟`}
        description="هل أنت متأكد من طرد هذا العضو من الفريق؟ لن يتمكن من المشاركة في المباريات القادمة."
        confirmText="طرد"
      />

      {/* Transfer Captain Confirmation */}
      <AlertModal
        open={!!captainTarget}
        onOpenChange={(open) => !open && setCaptainTarget(null)}
        title={`نقل القيادة إلى احمد؟`}
        description="سيصبح هذا العضو هو كابتن الفريق وستفقد صلاحيات القيادة الحالية."
        confirmText="نقل القيادة"
      />
    </StyleContainer>
  );
}
