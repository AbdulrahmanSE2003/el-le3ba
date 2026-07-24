import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";

import UserAvatar from "@/components/shared/UserAvatar";
import MemberInfo from "./MemberInfo";
import CaptainActions from "./CaptainActions";

import { Dispatch, SetStateAction } from "react";

import { Member } from "@/shared/types/team";
import { formatDate } from "@/components/shared/formatted-date";

interface Props {
  member: Member;
  openMenu: string | null;
  setOpenMenu: Dispatch<SetStateAction<string | null>>;
}

export default function MemberCard({ member, openMenu, setOpenMenu }: Props) {
  const { userId, joinedAt, role } = member;
  const joinedDate = formatDate(joinedAt);

  console.log(userId.avatar);
  
  return (
    <Motion
      as="div"
      key={member._id}
      variants={fadeInUp}
      className="relative flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all"
    >
      {/* Avatar */}
      <UserAvatar
        src={userId.avatar}
        fallback={userId.name[0].toUpperCase()}
        size="xl"
      />

      {/* Info */}
      <MemberInfo name={userId.name} joinedDate={joinedDate} role={role} />

      {/* Captain Actions */}
      <CaptainActions
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        member={member}
      />
    </Motion>
  );
}
