import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";

import UserAvatar from "@/components/shared/UserAvatar";
import MemberInfo from "./MemberInfo";
import CaptainActions from "./CaptainActions";

import { Dispatch, SetStateAction } from "react";

import { Member } from "@/shared/types/team";
import { formatDate } from "@/components/shared/formatted-date";
import { getAvatarUrl } from "@/lib/utils";

interface Props {
  member: Member;
  openMenu: string | null;
  setOpenMenu: Dispatch<SetStateAction<string | null>>;
  onKickClick: (member: Member) => void;
  onTransferClick: (member: Member) => void;
  myRole: "captain" | "member";
}

export default function MemberCard({
  member,
  openMenu,
  setOpenMenu,
  onKickClick,
  onTransferClick,
  myRole,
}: Props) {
  const { userId, joinedAt, role } = member;
  const joinedDate = formatDate(joinedAt);

  return (
    <Motion
      as="div"
      key={member._id}
      variants={fadeInUp}
      className="relative flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all"
    >
      {/* Avatar */}
      <UserAvatar
        src={getAvatarUrl(userId.avatar)}
        fallback={userId.name[0]?.toUpperCase() || "U"}
        size="xl"
      />

      {/* Info */}
      <MemberInfo name={userId.name} joinedDate={joinedDate} role={role} />

      {/* Captain Actions */}
      {myRole === "captain" && (
        <CaptainActions
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          member={member}
          onKickClick={onKickClick}
          onTransferClick={onTransferClick}
        />
      )}
    </Motion>
  );
}
